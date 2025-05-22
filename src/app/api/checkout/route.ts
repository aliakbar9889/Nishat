import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripe initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  
});

// Types
interface CartItem {
  title: string;
  description?: string;
  price: number;
  quantity?: number;
}

interface FormData {
  fullName: string;
  province: string;
  phoneNumber: string;
  city: string;
  address: string;
}

interface CheckoutRequestBody {
  cartItems: CartItem[];
  formData: FormData;
}

export async function POST(request: Request) {
  try {
    const { cartItems, formData }: CheckoutRequestBody = await request.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!formData) {
      return NextResponse.json({ error: 'Form data is missing' }, { status: 400 });
    }

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'pkr',
        product_data: {
          name: item.title,
          description: item.description || 'No description',
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        fullName: formData.fullName,
        province: formData.province,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        address: formData.address,
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Stripe checkout error:', errorMessage);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
