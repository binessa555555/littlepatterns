"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { products } from "@/data/products";

type Product = (typeof products)[number];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = useState<Product[]>([]);
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
    const additions = Array.from({ length: qty }, () => product);
    setCart((current) => [...current, ...additions]);
  }

  async function checkout() {
    if (cart.length === 0) return;

    // Checkout each selected product using your existing Ziina endpoint.
    // For now we group checkout by the first item.
    const first = cart[0];

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: first.name,
        quantity: cart.length,
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
            {cart.length > 0 && (
              <span className="counter">{cart.length}</span>
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

        <p>
          Thirty distinctive prints. Endless ways to create. Discover the
          pattern that makes your next piece unmistakably yours.
        </p>
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
          <div>
            <p className="eyebrow">YOUR BAG</p>
            <h2>
              {cart.length} {cart.length === 1 ? "fabric" : "fabrics"}
            </h2>
            <p>AED {(cart.length * 250).toFixed(2)}</p>
          </div>

          <button className="checkoutButton" onClick={checkout}>
            Checkout
          </button>
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
                <span className="imageNumber">2 / 2 • CLOSE-UP</span>

                <div className="zoomContainer">
                  <Image
                    src={selectedProduct.image}
                    alt={`${selectedProduct.name} close-up`}
                    fill
                    className="zoomImage"
                    sizes="50vw"
                  />
                </div>

                <p className="zoomHint">
                  Move over the image to view the fabric closely.
                </p>
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