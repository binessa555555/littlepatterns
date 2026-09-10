import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ZIINA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Ziina API key is missing" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty" },
        { status: 400 }
      );
    }

    const cleanItems = items.map((item: { name?: string; quantity?: number }) => ({
      name: String(item.name || "Little Patterns Fabric"),
      quantity: Math.max(
        1,
        Math.floor(Number(item.quantity) || 1)
      ),
    }));

    const totalQuantity = cleanItems.reduce(
      (total: number, item: { name: string; quantity: number }) => total + item.quantity,
      0
    );

    // AED 250 per fabric + AED 25 delivery
    const amount = (totalQuantity * 25000) + 2500;

    const orderSummary = cleanItems
      .map((item: { name: string; quantity: number }) => `${item.name} x ${item.quantity}`)
      .join(", ");

    const ziinaResponse = await fetch(
      "https://api-v2.ziina.com/api/payment_intent",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency_code: "AED",
          message: orderSummary,
          success_url:
            "https://www.littlepatterns.ae/?payment=success",
          cancel_url:
            "https://www.littlepatterns.ae/?payment=cancelled",
          failure_url:
            "https://www.littlepatterns.ae/?payment=failed",
          test: false,
        }),
      }
    );

    const data = await ziinaResponse.json();

    if (!ziinaResponse.ok || !data.redirect_url) {
      return NextResponse.json(
        {
          error:
            data?.message ||
            "Ziina payment could not be created",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.redirect_url,
    });
  } catch (error) {
    console.error("Ziina checkout error:", error);

    return NextResponse.json(
      { error: "Unable to start payment" },
      { status: 500 }
    );
  }
}
