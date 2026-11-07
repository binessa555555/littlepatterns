"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

type Method =
  | "ziina"
  | "cash";

export default function OrderConfirmedPage() {
  const [method, setMethod] =
    useState<Method>("ziina");

  const [orderNumber, setOrderNumber] =
    useState("");

  const [status, setStatus] =
    useState<
      "checking" |
      "confirmed" |
      "error"
    >("checking");

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const selectedMethod:
      Method =
      params.get("method") ===
      "cash"
        ? "cash"
        : "ziina";

    setMethod(selectedMethod);

    const existingOrder =
      params.get("order") || "";

    if (existingOrder) {
      setOrderNumber(
        existingOrder
      );

      setStatus("confirmed");

      localStorage.removeItem(
        "littlePatternsCart"
      );

      return;
    }

    if (
      selectedMethod === "cash"
    ) {
      setStatus("error");
      return;
    }

    const paymentIntent =
      params.get(
        "payment_intent"
      );

    if (!paymentIntent) {
      setStatus("error");
      return;
    }

    async function confirmPayment() {
      try {
        const response =
          await fetch(
            "/api/confirm-ziina",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  paymentIntent,
                }),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.orderNumber
        ) {
          throw new Error(
            data.error ||
            "Unable to confirm order."
          );
        }

        setOrderNumber(
          data.orderNumber
        );

        setStatus(
          "confirmed"
        );

        localStorage.removeItem(
          "littlePatternsCart"
        );

        window.history.replaceState(
          null,
          "",
          `/order-confirmed?method=ziina&order=${encodeURIComponent(
            data.orderNumber
          )}`
        );

      } catch (error) {
        console.error(error);

        setStatus("error");
      }
    }

    confirmPayment();
  }, []);


  if (status === "checking") {
    return (
      <main style={pageStyle}>
        <div style={cardStyle}>
          <Logo />

          <div style={checkStyle}>
            …
          </div>

          <h1 style={titleStyle}>
            CONFIRMING YOUR ORDER
          </h1>

          <p style={bodyStyle}>
            Please wait while we
            confirm your order.
          </p>
        </div>
      </main>
    );
  }


  if (status === "error") {
    return (
      <main style={pageStyle}>
        <div style={cardStyle}>
          <Logo />

          <h1 style={titleStyle}>
            ORDER CONFIRMATION
          </h1>

          <p style={bodyStyle}>
            We couldn&apos;t confirm
            your order automatically.
            Please contact Little
            Patterns if you need help.
          </p>

          <ContinueButton />
        </div>
      </main>
    );
  }


  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <Logo />

        <div style={checkStyle}>
          ✓
        </div>

        <h1 style={titleStyle}>
          ORDER CONFIRMED
        </h1>

        <p
          style={{
            fontFamily:
              "Georgia, serif",
            fontSize: "21px",
            margin:
              "0 0 18px",
          }}
        >
          Thank you for your
          order ♡
        </p>

        {method === "cash" ? (
          <>
            <p style={bodyStyle}>
              Your order has been
              confirmed.
              <br />
              Payment will be
              collected upon
              delivery.
            </p>

            <div
              style={{
                marginTop: "28px",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "Arial, sans-serif",
                  fontSize: "11px",
                  letterSpacing:
                    "2px",
                  color: "#777",
                  marginBottom:
                    "8px",
                }}
              >
                PAYMENT METHOD
              </div>

              <div
                style={{
                  fontFamily:
                    "Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing:
                    "1px",
                }}
              >
                CASH ON DELIVERY
              </div>
            </div>
          </>
        ) : (
          <p style={bodyStyle}>
            Your payment was
            successful and your
            order has been
            confirmed.
          </p>
        )}

        {orderNumber && (
          <div
            style={{
              margin:
                "30px auto 0",
              padding:
                "15px 20px",
              background:
                "#F5F9F7",
              maxWidth: "300px",
              fontFamily:
                "Arial, sans-serif",
              fontSize: "13px",
              letterSpacing:
                "1px",
            }}
          >
            ORDER #
            {orderNumber}
          </div>
        )}

        <p
          style={{
            ...bodyStyle,
            marginTop: "30px",
          }}
        >
          We&apos;ll prepare your
          Little Patterns order
          for delivery.
        </p>

        <ContinueButton />

        <p
          style={{
            marginTop: "40px",
            marginBottom: 0,
            fontFamily:
              "Arial, sans-serif",
            fontSize: "11px",
            color: "#777",
            letterSpacing:
              "0.5px",
          }}
        >
          LITTLE PATTERNS · UAE
        </p>
      </div>
    </main>
  );
}


function Logo() {
  return (
    <div
      style={{
        fontFamily:
          "Georgia, serif",
        fontSize: "22px",
        letterSpacing: "3px",
        marginBottom: "42px",
      }}
    >
      LITTLE PATTERNS
    </div>
  );
}


function ContinueButton() {
  return (
    <Link
      href="/"
      style={{
        display:
          "inline-block",
        marginTop: "38px",
        background:
          "#06377D",
        color: "#ffffff",
        textDecoration: "none",
        fontFamily:
          "Arial, sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "2px",
        padding:
          "16px 32px",
      }}
    >
      CONTINUE SHOPPING
    </Link>
  );
}


const pageStyle = {
  minHeight: "100vh",
  background: "#DDEDE5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  color: "#06377D",
} as const;


const cardStyle = {
  width: "100%",
  maxWidth: "620px",
  background: "#ffffff",
  padding: "60px 30px",
  textAlign: "center",
  boxShadow:
    "0 10px 40px rgba(6,55,125,0.08)",
} as const;


const checkStyle = {
  width: "62px",
  height: "62px",
  border:
    "2px solid #06377D",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin:
    "0 auto 28px",
  fontSize: "30px",
} as const;


const titleStyle = {
  fontFamily:
    "Georgia, serif",
  fontWeight: 400,
  fontSize:
    "clamp(32px, 6vw, 48px)",
  margin:
    "0 0 18px",
  letterSpacing: "1px",
} as const;


const bodyStyle = {
  fontFamily:
    "Arial, sans-serif",
  fontSize: "15px",
  lineHeight: 1.8,
  color: "#444",
  maxWidth: "430px",
  margin: "0 auto",
} as const;
