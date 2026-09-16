import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { supabaseBrowser } from '@/lib/supabase'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    const dateStr = threeDaysAgo.toISOString().split('T')[0]

    const { data: orders, error } = await supabaseBrowser
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
          await supabaseBrowser.from('orders').update({ trial_status: 'converted', is_trial: false }).eq('id', order.id)
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
          await supabaseBrowser.from('orders').update({
            trial_status: 'converted',
            is_trial: false,
          }).eq('id', order.id)

          // Send success email
          await resend.emails.send({
            from: 'ShopRevew <noreply@shoprevew.com>',
            to: order.email,
            subject: 'Payment confirmed — Welcome to ShopRevew!',
            html: `
              <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
                <img src="https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373" height="36" style="display:block; margin-bottom: 32px;" />
                <h1 style="font-size: 28px; font-weight: 900; color: #0F172A; margin-bottom: 8px;">Payment confirmed! 🎉</h1>
                <p style="color: #64748b; font-size: 15px; line-height: 1.7;">Hi ${order.name},</p>
                <p style="color: #64748b; font-size: 15px; line-height: 1.7;">Your 3-day trial has ended and your payment of <strong style="color: #0F172A;">$${order.total}</strong> has been successfully charged.</p>
                <div style="background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 12px; padding: 20px; margin: 24px 0;">
                  <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">Amount charged</div>
                  <div style="font-size: 28px; font-weight: 900; color: #22C55E;">$${order.total}</div>
                  <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">One-time payment — no further charges</div>
                </div>
                <p style="color: #64748b; font-size: 15px; line-height: 1.7;">Your ShopRevew license is now active for <strong style="color: #0F172A;">${order.domain}</strong>. Your review gallery is live and ready to use.</p>
                <p style="color: #64748b; font-size: 15px; line-height: 1.7;">Need help? Contact us on WhatsApp: <a href="https://wa.me/8801971914828" style="color: #2563EB;">+880 1971 914828</a></p>
                <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 32px 0;" />
                <p style="color: #94a3b8; font-size: 12px;">ShopRevew · shoprevew.com</p>
              </div>
            `,
          })

          results.push({ id: order.id, status: 'charged', amount: remainingCents })
        } else {
          results.push({ id: order.id, status: 'failed', pi_status: paymentIntent.status })
        }
      } catch (err) {
        console.error(`Failed to charge order ${order.id}:`, err)

        await supabaseBrowser.from('orders').update({ trial_status: 'payment_failed' }).eq('id', order.id)

        // Send failure email
        await resend.emails.send({
          from: 'ShopRevew <noreply@shoprevew.com>',
          to: order.email,
          subject: 'Payment failed — Action required',
          html: `
            <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
              <img src="https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373" height="36" style="display:block; margin-bottom: 32px;" />
              <h1 style="font-size: 28px; font-weight: 900; color: #0F172A; margin-bottom: 8px;">Payment failed ⚠️</h1>
              <p style="color: #64748b; font-size: 15px; line-height: 1.7;">Hi ${order.name},</p>
              <p style="color: #64748b; font-size: 15px; line-height: 1.7;">We were unable to charge your card for the remaining amount of <strong style="color: #0F172A;">$${order.total}</strong>.</p>
              <div style="background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <div style="font-size: 14px; color: #991B1B; font-weight: 600;">Please contact us to resolve this payment.</div>
              </div>
              <p style="color: #64748b; font-size: 15px; line-height: 1.7;">Contact us immediately on WhatsApp: <a href="https://wa.me/8801971914828" style="color: #2563EB;">+880 1971 914828</a></p>
              <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 32px 0;" />
              <p style="color: #94a3b8; font-size: 12px;">ShopRevew · shoprevew.com</p>
            </div>
          `,
        })

        results.push({ id: order.id, status: 'error', error: err.message })
      }
    }

    return NextResponse.json({ message: 'Done', count: results.length, results })
  } catch (err) {
    console.error('Cron error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
