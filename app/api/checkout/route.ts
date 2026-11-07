import { NextResponse } from "next/server";
import {
  createCipheriv,
  createHash,
  randomBytes,
} from "crypto";

export const runtime = "nodejs";

function encryptOrder(
  value: unknown,
  secret: string
) {
  const key = createHash("sha256")
    .update(secret)
    .digest();

  const iv = randomBytes(12);

  const cipher = createCipheriv(
    "aes-256-gcm",
    key,
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(
      JSON.stringify(value),
      "utf8"
    ),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return [
    iv.toString("base64url"),
    tag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customer = {},
      items = [],
      promoCode = "",
    } = body;

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.ZIINA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Ziina payment is not configured.",
        },
        { status: 500 }
      );
    }

    const cleanItems = items.map(
      (item: { name?: string }) => ({
        name: String(
          item.name ||
            "Little Patterns Fabric"
        ),
        quantity: 1,
      })
    );

    const totalQuantity =
      cleanItems.length;

    const subtotal =
      totalQuantity * 250;

    const delivery = 35;

    const discount =
      String(promoCode).trim() === "9604"
        ? 35
        : 0;

    const total =
      subtotal +
      delivery -
      discount;

    const amount = total * 100;

    const itemsSummary =
      cleanItems
        .map(
          (item) =>
            `${item.name} x ${item.quantity}`
        )
        .join(", ");

    const orderNumber =
      `LP-${Date.now()
        .toString()
        .slice(-8)}`;

    const pendingOrder = {
      orderNumber,

      customer:
        `${customer.firstName || ""} ${
          customer.lastName || ""
        }`.trim(),

      phone:
        String(customer.phone || ""),

      email:
        String(customer.email || ""),

      address:
        String(customer.address || ""),

      city:
        String(customer.city || ""),

      area:
        String(customer.area || ""),

      notes:
        String(
          customer.notes || ""
        ).slice(0, 800),

      items: itemsSummary,
      stockItems: cleanItems,

      subtotal,
      delivery,
      discount,
      total,

      payment: "Ziina",
      status: "Paid",
    };

    const ziinaResponse =
      await fetch(
        "https://api-v2.ziina.com/api/payment_intent",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${apiKey}`,
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            amount,
            currency_code: "AED",
            message: itemsSummary,

            success_url:
              "https://www.littlepatterns.ae/order-confirmed?method=ziina&payment_intent={PAYMENT_INTENT_ID}",

            cancel_url:
              "https://www.littlepatterns.ae/?payment=cancelled",

            failure_url:
              "https://www.littlepatterns.ae/?payment=failed",

            test: false,
            allow_tips: false,
          }),
        }
      );

    const data =
      await ziinaResponse.json();

    if (
      !ziinaResponse.ok ||
      !data.redirect_url
    ) {
      return NextResponse.json(
        {
          error:
            data?.message ||
            "Ziina payment could not be created",
        },
        { status: 500 }
      );
    }

    const encrypted =
      encryptOrder(
        pendingOrder,
        apiKey
      );

    const response =
      NextResponse.json({
        url: data.redirect_url,
      });

    response.cookies.set(
      "lp_pending_order",
      encrypted,
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      }
    );

    return response;

  } catch (error) {
    console.error(
      "Ziina checkout error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to start payment",
      },
      { status: 500 }
    );
  }
}
