import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createDecipheriv,
  createHash,
} from "crypto";

export const runtime = "nodejs";

function decryptOrder(
  token: string,
  secret: string
) {
  const [
    ivPart,
    tagPart,
    dataPart,
  ] = token.split(".");

  if (
    !ivPart ||
    !tagPart ||
    !dataPart
  ) {
    throw new Error(
      "Invalid pending order."
    );
  }

  const key = createHash("sha256")
    .update(secret)
    .digest();

  const decipher =
    createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(
        ivPart,
        "base64url"
      )
    );

  decipher.setAuthTag(
    Buffer.from(
      tagPart,
      "base64url"
    )
  );

  const decrypted =
    Buffer.concat([
      decipher.update(
        Buffer.from(
          dataPart,
          "base64url"
        )
      ),
      decipher.final(),
    ]);

  return JSON.parse(
    decrypted.toString("utf8")
  );
}

export async function POST(
  request: Request
) {
  try {
    const {
      paymentIntent,
    } = await request.json();

    if (!paymentIntent) {
      return NextResponse.json(
        {
          error:
            "Missing payment confirmation.",
        },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.ZIINA_API_KEY;

    const googleOrdersUrl =
      process.env.GOOGLE_ORDERS_URL;

    if (
      !apiKey ||
      !googleOrdersUrl
    ) {
      return NextResponse.json(
        {
          error:
            "Order confirmation is not configured.",
        },
        { status: 500 }
      );
    }

    const cookieStore =
      await cookies();

    const pendingCookie =
      cookieStore.get(
        "lp_pending_order"
      )?.value;

    if (!pendingCookie) {
      return NextResponse.json(
        {
          error:
            "Order information could not be found.",
        },
        { status: 400 }
      );
    }

    const pending =
      decryptOrder(
        pendingCookie,
        apiKey
      );

    const ziinaResponse =
      await fetch(
        `https://api-v2.ziina.com/api/payment_intent/${encodeURIComponent(
          paymentIntent
        )}`,
        {
          headers: {
            Authorization:
              `Bearer ${apiKey}`,
          },
          cache: "no-store",
        }
      );

    const ziina =
      await ziinaResponse.json();

    if (!ziinaResponse.ok) {
      return NextResponse.json(
        {
          error:
            "Could not verify payment.",
        },
        { status: 400 }
      );
    }

    if (
      ziina.status !==
      "completed"
    ) {
      return NextResponse.json(
        {
          error:
            "Payment has not been completed.",
        },
        { status: 400 }
      );
    }

    const expectedAmount =
      Number(pending.total) * 100;

    if (
      Number(ziina.amount) !==
      expectedAmount
    ) {
      return NextResponse.json(
        {
          error:
            "Payment amount does not match the order.",
        },
        { status: 400 }
      );
    }

    const googleResponse =
      await fetch(
        googleOrdersUrl,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },

          body: JSON.stringify({
            orderNumber:
              pending.orderNumber,

            customer:
              pending.customer,

            phone:
              pending.phone,

            email:
              pending.email,

            address:
              pending.address,

            city:
              pending.city,

            area:
              pending.area,

            items:
              pending.items,

            stockItems:
              pending.stockItems,

            subtotal:
              pending.subtotal,

            delivery:
              pending.delivery,

            discount:
              pending.discount,

            total:
              pending.total,

            payment: "Ziina",

            status: "Paid",

            notes:
              pending.notes || "",
          }),
        }
      );

    if (!googleResponse.ok) {
      throw new Error(
        "Google order update failed."
      );
    }

    const response =
      NextResponse.json({
        success: true,
        orderNumber:
          pending.orderNumber,
      });

    response.cookies.set(
      "lp_pending_order",
      "",
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      }
    );

    return response;

  } catch (error) {
    console.error(
      "Payment confirmation error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "We could not confirm your order.",
      },
      { status: 500 }
    );
  }
}
