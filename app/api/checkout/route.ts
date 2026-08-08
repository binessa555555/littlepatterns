import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is missing" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);

    const body = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: body.name || "Little Patterns Fabric",
            },
            unit_amount: 19700,
          },
          quantity: body.quantity || 1,
        },
      ],

      success_url: `${request.headers.get("origin")}/?payment=success`,
      cancel_url: `${request.headers.get("origin")}/?payment=cancelled`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error: any) {
    console.error("STRIPE CHECKOUT ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Stripe checkout failed",
      },
      { status: 500 }
    );
  }
}