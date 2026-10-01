import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customer = {},
      items = [],
      promoCode = "",
    } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ZIINA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Ziina is not configured" },
        { status: 500 }
      );
    }

    const cleanItems = items.map(
      (item: { name?: string; quantity?: number }) => ({
        name: String(item.name || "Little Patterns Fabric"),
        quantity: 1,
      })
    );

    const totalQuantity = cleanItems.length;

    const subtotal = totalQuantity * 250;
    const delivery = 35;
    const discount =
      String(promoCode).trim() === "9604" ? 35 : 0;

    const total = subtotal + delivery - discount;

    const amount = total * 100;

    const itemsSummary = cleanItems
      .map(
        (item: { name: string; quantity: number }) =>
          `${item.name} x ${item.quantity}`
      )
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
          message: itemsSummary,
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

    const googleOrdersUrl =
      process.env.GOOGLE_ORDERS_URL;

    if (googleOrdersUrl) {
      const orderNumber =
        `LP-${Date.now().toString().slice(-8)}`;

      try {
        await fetch(googleOrdersUrl, {
          method: "POST",
          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            orderNumber,

            customer:
              `${customer.firstName || ""} ${customer.lastName || ""}`.trim(),

            phone: customer.phone || "",
            email: customer.email || "",
            address: customer.address || "",
            city: customer.city || "",
            area: customer.area || "",

            items: itemsSummary,
            stockItems: cleanItems,

            subtotal,
            delivery,
            discount,
            total,

            payment: "Ziina",
            status: "Order Placed",
            notes: customer.notes || "",
          }),
        });
      } catch (error) {
        console.error(
          "Google order/stock update failed:",
          error
        );
      }
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
