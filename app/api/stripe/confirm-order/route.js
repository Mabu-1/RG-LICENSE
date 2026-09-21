import { NextResponse } from 'next/server'
import { supabaseBrowser } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { orderId, customerId, paymentMethodId, paymentIntentId } = await req.json()
    const today = new Date().toISOString().split('T')[0]

    const { data: order } = await supabaseBrowser.from('orders').select('*').eq('id', orderId).single()

    await supabaseBrowser.from('orders').update({
      stripe_customer_id: customerId,
      stripe_payment_method_id: paymentMethodId,
      trial_status: 'trial',
      trial_start_date: today,
      is_trial: true,
      status: 'active',
    }).eq('id', orderId)

    // Send trial started email
    if (order) {
      await resend.emails.send({
        from: 'ShopRevew <noreply@shoprevew.com>',
        to: order.email,
        subject: 'Your 3-day trial has started — ShopRevew',
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
            <img src="https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373" height="36" style="display:block; margin-bottom: 32px;" />
            <h1 style="font-size: 28px; font-weight: 900; color: #0F172A; margin-bottom: 8px;">Your trial has started! 🎉</h1>
            <p style="color: #64748b; font-size: 15px; line-height: 1.7;">Hi ${order.name},</p>
            <p style="color: #64748b; font-size: 15px; line-height: 1.7;">Your $1 payment was successful and your 3-day trial has started. We will be in touch via WhatsApp to schedule your installation.</p>
            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="color: #64748b; font-size: 13px;">Trial payment</span>
                <strong style="color: #0F172A;">$1.00</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="color: #64748b; font-size: 13px;">Domain</span>
                <strong style="color: #0F172A;">${order.domain}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748b; font-size: 13px;">Remaining charge (after 3 days)</span>
                <strong style="color: #2563EB;">$${order.total}</strong>
              </div>
            </div>
            <p style="color: #64748b; font-size: 15px; line-height: 1.7;">After 3 days, <strong style="color: #0F172A;">$${order.total}</strong> will be automatically charged to your card. No action needed from you.</p>
            <p style="color: #64748b; font-size: 15px; line-height: 1.7;">Questions? Contact us on WhatsApp: <a href="https://wa.me/8801971914828" style="color: #2563EB;">+880 1971 914828</a></p>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 32px 0;" />
            <p style="color: #94a3b8; font-size: 12px;">ShopRevew · shoprevew.com</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Confirm order error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
