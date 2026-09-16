import { NextResponse } from 'next/server'
import { supabaseBrowser } from '@/lib/supabase'

export async function POST(req) {
  try {
    const { orderId, customerId, paymentMethodId, paymentIntentId } = await req.json()
    const today = new Date().toISOString().split('T')[0]

    await supabaseBrowser.from('orders').update({
      stripe_customer_id: customerId,
      stripe_payment_method_id: paymentMethodId,
      trial_status: 'trial',
      trial_start_date: today,
      is_trial: true,
      status: 'active',
    }).eq('id', orderId)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Confirm order error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
