import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ZIINA_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Ziina API key is missing" }, { status: 500 });

    const body = await request.json();
    const productName = body.name || "Little Patterns Fabric";
    const quantity = Math.max(1, Math.floor(Number(body.quantity) || 1));
    const amount = 25000 * quantity; // AED 250.00 each

    const ziinaResponse = await fetch("https://api-v2.ziina.com/api/payment_intent", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount, currency_code: "AED", message: `${productName} x ${quantity}`,
        success_url: "https://www.littlepatterns.ae/?payment=success",
        cancel_url: "https://www.littlepatterns.ae/?payment=cancelled",
        failure_url: "https://www.littlepatterns.ae/?payment=failed",
        test: false,
      }),
    });

    const data = await ziinaResponse.json();
    if (!ziinaResponse.ok || !data.redirect_url)
      return NextResponse.json({ error: data?.message || "Ziina payment could not be created" }, { status: 500 });

    return NextResponse.json({ url: data.redirect_url });
  } catch (error) {
    console.error("Ziina checkout error:", error);
    return NextResponse.json({ error: "Unable to start payment" }, { status: 500 });
  }
}
