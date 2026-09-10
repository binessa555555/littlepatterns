import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items = [] } = body;

    if (!customer?.firstName || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { error: "Missing customer details" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty" },
        { status: 400 }
      );
    }

    const cleanItems = items.map((item: any) => ({
      name: String(item.name || "Fabric"),
      quantity: Math.max(1, Math.floor(Number(item.quantity) || 1)),
    }));

    const fabricTotal = cleanItems.reduce(
      (sum: number, item: any) => sum + item.quantity * 250,
      0
    );

    const total = fabricTotal + 25;

    const orderLines = cleanItems
      .map((item: any) =>
        `${item.name} x ${item.quantity} — AED ${item.quantity * 250}`
      )
      .join("\n");

    const emailText = `
NEW LITTLE PATTERNS ORDER

PAYMENT: CASH ON DELIVERY

CUSTOMER
${customer.firstName} ${customer.lastName}
Phone: ${customer.phone}
Email: ${customer.email}

DELIVERY
${customer.address}
${customer.area}
${customer.city}
United Arab Emirates

ORDER
${orderLines}

Fabrics: AED ${fabricTotal.toFixed(2)}
Delivery: AED 25.00
TOTAL: AED ${total.toFixed(2)}

Notes:
${customer.notes || "None"}
`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Little Patterns <onboarding@resend.dev>",
        to: ["littlepatterns.ae@gmail.com"],
        subject: `NEW CASH ORDER — AED ${total.toFixed(2)}`,
        text: emailText,
      }),
    });

    const emailData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Order email failed:", emailData);

      return NextResponse.json(
        { error: "Order email could not be sent" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cash order error:", error);

    return NextResponse.json(
      { error: "Unable to place order" },
      { status: 500 }
    );
  }
}
