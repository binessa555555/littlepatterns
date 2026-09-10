"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./checkout.css";

type CartItem = {
  name: string;
  quantity: number;
  image?: string;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState("ziina");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("littlePatternsCart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  const fabricTotal = cart.reduce(
    (sum, item) => sum + item.quantity * 250,
    0
  );

  const delivery = 25;
  const total = fabricTotal + delivery;

  async function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const customer = {
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      country: "United Arab Emirates",
      address: String(form.get("address") || ""),
      city: String(form.get("city") || ""),
      area: String(form.get("area") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      notes: String(form.get("notes") || ""),
    };

    try {
      if (payment === "cash") {
        const response = await fetch("/api/cash-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer,
            items: cart,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to place order");
        }

        sessionStorage.removeItem("littlePatternsCart");

        alert(
          "Order placed successfully! Payment will be collected on delivery."
        );

        window.location.href = "/?order=success";
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start payment");
      }

      window.location.href = data.url;
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
      setLoading(false);
    }
  }

  return (
    <main className="checkoutPage">
      <header className="checkoutHeader">
        <Link href="/">LITTLE PATTERNS</Link>
        <span>CHECKOUT</span>
        <Link href="/#cart">← Back to Cart</Link>
      </header>

      <div className="checkoutContainer">
        <div className="checkoutTitle">
          <p>LITTLE PATTERNS</p>
          <h1>Checkout</h1>
          <span>Complete your delivery details below.</span>
        </div>

        <form className="checkoutForm" onSubmit={submitOrder}>
          <h2>Delivery Details</h2>

          <div className="twoColumns">
            <label>
              First name *
              <input name="firstName" required />
            </label>

            <label>
              Last name *
              <input name="lastName" required />
            </label>
          </div>

          <label>
            Country / Region *
            <input
              value="United Arab Emirates"
              readOnly
              className="readonly"
            />
          </label>

          <label>
            Street address *
            <input
              name="address"
              placeholder="Villa / apartment, building and street"
              required
            />
          </label>

          <label>
            Emirate *
            <select name="city" required defaultValue="">
              <option value="" disabled>Select emirate</option>
              <option>Dubai</option>
              <option>Abu Dhabi</option>
              <option>Sharjah</option>
              <option>Ajman</option>
              <option>Ras Al Khaimah</option>
              <option>Fujairah</option>
              <option>Umm Al Quwain</option>
            </select>
          </label>

          <label>
            Area *
            <input
              name="area"
              placeholder="Example: Nad Al Sheba"
              required
            />
          </label>

          <label>
            Phone *
            <input
              name="phone"
              type="tel"
              placeholder="+971"
              required
            />
          </label>

          <label>
            Email address *
            <input name="email" type="email" required />
          </label>

          <label>
            Order notes (optional)
            <textarea
              name="notes"
              rows={4}
              placeholder="Delivery instructions..."
            />
          </label>

          <div style={{
            borderTop: "1px solid #d9d2c7",
            marginTop: "35px",
            paddingTop: "30px"
          }}>
            <h2>Your Order</h2>

            {cart.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px"
                }}
              >
                <span>{item.name} × {item.quantity}</span>
                <span>AED {(item.quantity * 250).toFixed(2)}</span>
              </div>
            ))}

            <div style={{
              borderTop: "1px solid #ddd",
              marginTop: "20px",
              paddingTop: "18px"
            }}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span>Fabrics</span>
                <span>AED {fabricTotal.toFixed(2)}</span>
              </div>

              <div style={{
                display:"flex",
                justifyContent:"space-between",
                marginTop:"10px"
              }}>
                <span>Delivery</span>
                <span>AED 25.00</span>
              </div>

              <div style={{
                display:"flex",
                justifyContent:"space-between",
                marginTop:"18px",
                fontSize:"24px"
              }}>
                <strong>Total</strong>
                <strong>AED {total.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div style={{
            borderTop:"1px solid #d9d2c7",
            marginTop:"35px",
            paddingTop:"30px"
          }}>
            <h2>Payment Method</h2>

            <label style={{
              border:"1px solid #c9c1b6",
              padding:"18px",
              cursor:"pointer"
            }}>
              <input
                type="radio"
                name="payment"
                value="ziina"
                checked={payment === "ziina"}
                onChange={() => setPayment("ziina")}
                style={{width:"auto", display:"inline", marginRight:"12px"}}
              />
              Card / Apple Pay / Google Pay
            </label>

            <label style={{
              border:"1px solid #c9c1b6",
              padding:"18px",
              cursor:"pointer"
            }}>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={payment === "cash"}
                onChange={() => setPayment("cash")}
                style={{width:"auto", display:"inline", marginRight:"12px"}}
              />
              Cash on Delivery
            </label>
          </div>

          <button
            className="continueButton"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "PLEASE WAIT..."
              : payment === "cash"
              ? `PLACE ORDER — AED ${total.toFixed(2)}`
              : `PAY AED ${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </main>
  );
}
