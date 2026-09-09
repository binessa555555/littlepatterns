"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { products } from "@/data/products";

type Product = (typeof products)[number];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setQuantity(1);
  }

  function toggleWishlist(product: Product) {
    setWishlist((current) =>
      current.includes(product.name)
        ? current.filter((name) => name !== product.name)
        : [...current, product.name]
    );
  }

  function addToCart(product: Product, qty = 1) {
    setCart((current) => {
      const existing = current.find(
        (item) => item.product.name === product.name
      );

      if (existing) {
        return current.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [...current, { product, quantity: qty }];
    });
  }

  function changeCartQuantity(productName: string, change: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.name === productName
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productName: string) {
    setCart((current) =>
      current.filter((item) => item.product.name !== productName)
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.quantity * 250,
    0
  );

  async function checkout() {
    if (cart.length === 0) return;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
        })),
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    alert(data.error || "Unable to start checkout.");
  }

  return (
    <main className="site">
      {/* HEADER */}
      <header className="header">
        <a href="#" className="brand">
          Little ❉ Patterns
          <span>PREMIÈRE FABRICS</span>
        </a>

        <nav className="nav">
          <a href="#fabrics">Fabrics</a>
          <a href="#story">Our Story</a>

          <button
            className="iconButton"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            ⌕
          </button>

          <button
            className="iconButton"
            onClick={() => {
              setSearchOpen(false);
              document
                .getElementById("wishlist")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Wishlist"
          >
            ♡
            {wishlist.length > 0 && (
              <span className="counter">{wishlist.length}</span>
            )}
          </button>

          <button
            className="iconButton"
            onClick={() =>
              document
                .getElementById("cart")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Cart"
          >
            🛍
            {cartCount > 0 && (
              <span className="counter">{cartCount}</span>
            )}
          </button>
        </nav>
      </header>

      {searchOpen && (
        <div className="searchBar">
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fabrics..."
          />

          {search && (
            <button onClick={() => setSearch("")}>
              Clear
            </button>
          )}
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="heroContent">
          <p className="eyebrow">PREMIÈRE FABRICS</p>

          <h1>
            Patterns made
            <br />
            to become
            <br />
            something unforgettable.
          </h1>

          <p className="heroText">
            Where every beautiful thing begins, and elegance is in every
            thread.
          </p>

          <a className="primaryButton" href="#fabrics">
            EXPLORE COLLECTION
          </a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="fabrics" className="productsSection">
        <div className="sectionHeading">
          <p>THE COLLECTION</p>
          <h2>All Fabrics</h2>
        </div>

        <div className="productGrid">
          {filteredProducts.map((product) => {
            const liked = wishlist.includes(product.name);

            return (
              <article className="productCard" key={product.name}>
                <div
                  className="imageBox"
                  onClick={() => openProduct(product)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="productImage"
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />

                  <button
                    className={`heartButton ${liked ? "liked" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label="Add to wishlist"
                  >
                    {liked ? "♥" : "♡"}
                  </button>
                </div>

                <div className="productInfo">
                  <h3>{product.name}</h3>
                  <p className="price">AED 250.00</p>

                  <div className="productButtons">
                    <button
                      className="addButton"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>

                    <a
                      className="instagramButton"
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ask on Instagram
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <p className="nothingFound">No fabrics found.</p>
        )}
      </section>

      {/* STORY */}
      <section id="story" className="story">
        <div>
          <p className="eyebrow light">LITTLE PATTERNS</p>

          <h2>
            Fabrics chosen
            <br />
            for ideas worth creating.
          </h2>
        </div>


      </section>

      {/* WISHLIST */}
      {wishlist.length > 0 && (
        <section id="wishlist" className="miniSection">
          <div className="sectionHeading">
            <p>YOUR SAVED PIECES</p>
            <h2>Wishlist</h2>
          </div>

          <div className="miniGrid">
            {products
              .filter((product) => wishlist.includes(product.name))
              .map((product) => (
                <button
                  key={product.name}
                  className="miniCard"
                  onClick={() => openProduct(product)}
                >
                  <div className="miniImage">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="productImage"
                    />
                  </div>

                  <strong>{product.name}</strong>
                  <span>AED 250.00</span>
                </button>
              ))}
          </div>
        </section>
      )}

      {/* CART */}
      {cart.length > 0 && (
        <section id="cart" className="cartSection">
          <div style={{ width: "100%" }}>
            <p className="eyebrow">YOUR BAG</p>
            <h2>Your Selection</h2>

            <div style={{ marginTop: "25px" }}>
              {cart.map((item) => (
                <div
                  key={item.product.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                    padding: "20px 0",
                    borderBottom: "1px solid #d5ddd5",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "95px",
                        position: "relative",
                        background: "white",
                        borderRadius: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="productImage"
                      />
                    </div>

                    <div>
                      <h3 style={{ margin: "0 0 5px" }}>
                        {item.product.name}
                      </h3>
                      <span>AED 250.00 each</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <div className="quantity">
                      <button
                        onClick={() =>
                          changeCartQuantity(item.product.name, -1)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          changeCartQuantity(item.product.name, 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <strong>
                      AED {(item.quantity * 250).toFixed(2)}
                    </strong>

                    <button
                      onClick={() => removeFromCart(item.product.name)}
                      style={{
                        border: "none",
                        background: "transparent",
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#777",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "30px",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div>{cartCount} items</div>
                <strong style={{ fontSize: "24px" }}>
                  Total: AED {cartTotal.toFixed(2)}
                </strong>
              </div>

              <button className="checkoutButton" onClick={checkout}>
                Checkout
              </button>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCT VIEWER */}
      {selectedProduct && (
        <div
          className="modalOverlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="productModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="closeButton"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <div className="modalImages">
              {/* IMAGE 1 */}
              <div className="modalImageCard">
                <span className="imageNumber">1 / 2</span>

                <div className="modalImageWrap">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="modalImage"
                    sizes="50vw"
                  />
                </div>
              </div>

              {/* IMAGE 2 - CLOSE UP */}
              <div className="modalImageCard closeupCard">
                <span className="imageNumber">2 / 2</span>

                <div className="zoomContainer">
                  <Image
                    src={`/model-fabrics/fabric-${String(
                      products.findIndex(
                        (p) => p.name === selectedProduct.name
                      ) + 1
                    ).padStart(2, "0")}.jpg`}
                    alt={`${selectedProduct.name} model`}
                    fill
                    className="secondModelImage"
                    sizes="50vw"
                  />
                </div>


              </div>
            </div>

            <div className="modalDetails">
              <div>
                <p className="eyebrow">LITTLE PATTERNS</p>
                <h2>{selectedProduct.name}</h2>
                <p className="modalPrice">AED 250.00</p>
              </div>

              <div className="quantityArea">
                <span>Quantity</span>

                <div className="quantity">
                  <button
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() =>
                      setQuantity((current) => current + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="modalAdd"
                onClick={() => {
                  addToCart(selectedProduct, quantity);
                  setSelectedProduct(null);
                }}
              >
                Add {quantity} to Cart · AED{" "}
                {(250 * quantity).toFixed(2)}
              </button>

              <a
                className="modalInstagram"
                href="https://www.instagram.com/littlepatterns.ae?stkn=cmtoajBueWIwaDJ5&utm_source=qr"
                target="_blank"
                rel="noreferrer"
              >
                Ask about this fabric on Instagram
              </a>
            </div>
          </div>
        </div>
      )}

      <footer>
        <strong>Little Patterns</strong>
        <span>Première Fabrics · Dubai, UAE</span>
        <span>© 2026 Little Patterns. All rights reserved.</span>
      </footer>
    </main>
  );
}