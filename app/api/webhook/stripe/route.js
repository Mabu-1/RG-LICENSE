import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = { api: { bodyParser: false } }

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = session.metadata?.order_id
    const customerId = session.metadata?.customer_id
    const fullTotal = parseFloat(session.metadata?.full_total || '0')

    if (!orderId) return NextResponse.json({ received: true })

    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
    const paymentMethodId = paymentIntent.payment_method

    const today = new Date().toISOString().split('T')[0]

    await supabaseServer.from('orders').update({
      stripe_customer_id: customerId,
      stripe_payment_method_id: paymentMethodId,
      stripe_session_id: session.id,
      trial_status: 'trial',
      trial_start_date: today,
      is_trial: true,
      status: 'active',
    }).eq('id', orderId)
  }

  return NextResponse.json({ received: true })
}
