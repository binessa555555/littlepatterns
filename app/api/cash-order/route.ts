import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { customer, items = [] } = await request.json();

    if (
      !customer?.firstName ||
      !customer?.phone ||
      !customer?.address ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing order information" },
        { status: 400 }
      );
    }

    const cleanItems = items.map(
      (item: { name?: string; quantity?: number }) => ({
        name: String(item.name || "Little Patterns Fabric"),
        quantity: Math.max(
          1,
          Math.floor(Number(item.quantity) || 1)
        ),
      })
    );

    const fabricTotal = cleanItems.reduce(
      (total: number, item: { name: string; quantity: number }) =>
        total + item.quantity * 250,
      0
    );

    const delivery = 25;
    const total = fabricTotal + delivery;

    const orderNumber = `LP-${Date.now()
      .toString()
      .slice(-8)}`;

    const orderRows = cleanItems
      .map(
        (item: { name: string; quantity: number }) => `
          <tr>
            <td style="padding:10px;border-bottom:1px solid #ddd;">
              ${item.name}
            </td>
            <td style="padding:10px;border-bottom:1px solid #ddd;text-align:center;">
              ${item.quantity}
            </td>
            <td style="padding:10px;border-bottom:1px solid #ddd;text-align:right;">
              AED ${(item.quantity * 250).toFixed(2)}
            </td>
          </tr>
        `
      )
      .join("");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Little Patterns Orders" <${process.env.GMAIL_USER}>`,
      to: "littlepatterns.ae@gmail.com",
      replyTo: customer.email || undefined,

      subject:
        `NEW ORDER ${orderNumber} — CASH — AED ${total.toFixed(2)}`,

      html: `
        <div style="
          font-family:Arial,sans-serif;
          max-width:700px;
          margin:auto;
          color:#222;
        ">

          <h1>New Little Patterns Order</h1>

          <p><strong>Order:</strong> ${orderNumber}</p>

          <p style="
            display:inline-block;
            background:#eee7dc;
            padding:8px 14px;
          ">
            CASH ON DELIVERY
          </p>

          <h2>Customer</h2>

          <p>
            <strong>Name:</strong>
            ${customer.firstName} ${customer.lastName || ""}
          </p>

          <p>
            <strong>Phone:</strong>
            ${customer.phone}
          </p>

          <p>
            <strong>Email:</strong>
            ${customer.email || "Not provided"}
          </p>

          <h2>Delivery Address</h2>

          <p>
            ${customer.address}<br/>
            ${customer.area || ""}<br/>
            ${customer.city || ""}<br/>
            United Arab Emirates
          </p>

          <h2>Order</h2>

          <table style="
            width:100%;
            border-collapse:collapse;
          ">
            <tr>
              <th style="text-align:left;padding:10px;">Fabric</th>
              <th style="padding:10px;">Qty</th>
              <th style="text-align:right;padding:10px;">Price</th>
            </tr>

            ${orderRows}
          </table>

          <div style="
            margin-top:25px;
            text-align:right;
            font-size:16px;
          ">
            <p>Fabrics: AED ${fabricTotal.toFixed(2)}</p>
            <p>Delivery: AED 25.00</p>

            <h2>
              TOTAL: AED ${total.toFixed(2)}
            </h2>
          </div>

          <h2>Customer Notes</h2>

          <p>${customer.notes || "No notes"}</p>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      orderNumber,
    });

  } catch (error) {
    console.error("Cash order error:", error);

    return NextResponse.json(
      {
        error:
          "Order could not be sent. Please try again.",
      },
      { status: 500 }
    );
  }
}
