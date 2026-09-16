import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { supabaseBrowser as supabaseServer } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function GET(req) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    const dateStr = threeDaysAgo.toISOString().split('T')[0]

    const { data: orders, error } = await supabaseServer
      .from('orders')
      .select('*')
      .eq('trial_status', 'trial')
      .eq('trial_start_date', dateStr)

    if (error) throw error
    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: 'No trials to charge', count: 0 })
    }

    const results = []

    for (const order of orders) {
      try {
        if (!order.stripe_customer_id || !order.stripe_payment_method_id) {
          results.push({ id: order.id, status: 'skipped', reason: 'no stripe data' })
          continue
        }

        const remainingCents = Math.round((order.total - 1) * 100)
        if (remainingCents <= 0) {
          await supabaseServer.from('orders').update({
            trial_status: 'converted',
            is_trial: false,
          }).eq('id', order.id)
          results.push({ id: order.id, status: 'converted_free' })
          continue
        }

        const paymentIntent = await stripe.paymentIntents.create({
          amount: remainingCents,
          currency: 'usd',
          customer: order.stripe_customer_id,
          payment_method: order.stripe_payment_method_id,
          confirm: true,
          off_session: true,
          description: `ShopRevew — ${order.plan} plan remaining payment`,
          metadata: { order_id: order.id.toString() },
        })

        if (paymentIntent.status === 'succeeded') {
          await supabaseServer.from('orders').update({
            trial_status: 'converted',
            is_trial: false,
          }).eq('id', order.id)
          results.push({ id: order.id, status: 'charged', amount: remainingCents })
        } else {
          results.push({ id: order.id, status: 'failed', pi_status: paymentIntent.status })
        }
      } catch (err) {
        console.error(`Failed to charge order ${order.id}:`, err)
        await supabaseServer.from('orders').update({
          trial_status: 'payment_failed',
        }).eq('id', order.id)
        results.push({ id: order.id, status: 'error', error: err.message })
      }
    }

    return NextResponse.json({ message: 'Done', count: results.length, results })
  } catch (err) {
    console.error('Cron error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
