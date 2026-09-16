import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, orderId, total } = body

    const customer = await stripe.customers.create({ name, email })

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'payment',
      payment_intent_data: {
        setup_future_usage: 'off_session',
        metadata: {
          order_id: orderId,
          customer_id: customer.id,
          full_total: total.toString(),
        },
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ShopRevew — 3 Day Trial',
              description: `Full amount $${total} will be charged after 3 days`,
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/book`,
      metadata: {
        order_id: orderId,
        customer_id: customer.id,
        full_total: total.toString(),
      },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id, customerId: customer.id })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
