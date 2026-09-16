import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, orderId, total } = body

    const customer = await stripe.customers.create({ name, email })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
      customer: customer.id,
      setup_future_usage: 'off_session',
      metadata: {
        order_id: orderId,
        customer_id: customer.id,
        full_total: total.toString(),
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      paymentIntentId: paymentIntent.id,
    })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
