import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get user address information from database or other sources
      var lineItems = req.body.cartItems.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
        return {
          price_data: { 
            currency: 'usd',
            product_data: { 
              name: `${item.name} (${item.option})`,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled:true,
            minimum: 1,
          },
          quantity: item.quantity
        }
      })
      if (req.body.delivery) {
        lineItems.push({
        price_data: { 
          currency: 'usd',
          product_data: { 
            name: `Delivery Charge`
          },
          unit_amount: req.body.delivery * 100,
        },
        quantity: req.body.deliveryQty
      })
      }
      const params = {
        line_items: lineItems,
        automatic_tax: {
          enabled: true,
        },
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/checkout`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
