"use client";

import { useMemo, useState } from "react";

const groceries = [
  { name: "Fresh Milk", icon: "🥛", category: "Dairy", price: 8.50 },
  { name: "Large Eggs", icon: "🥚", category: "Dairy", price: 14.00 },
  { name: "Cheddar Cheese", icon: "🧀", category: "Dairy", price: 18.50 },
  { name: "Greek Yogurt", icon: "🥣", category: "Dairy", price: 7.50 },

  { name: "Bananas", icon: "🍌", category: "Fruits", price: 6.00 },
  { name: "Red Apples", icon: "🍎", category: "Fruits", price: 9.50 },
  { name: "Oranges", icon: "🍊", category: "Fruits", price: 8.00 },
  { name: "Watermelon", icon: "🍉", category: "Fruits", price: 16.00 },
  { name: "Strawberries", icon: "🍓", category: "Fruits", price: 13.50 },
  { name: "Grapes", icon: "🍇", category: "Fruits", price: 12.00 },
  { name: "Mango", icon: "🥭", category: "Fruits", price: 10.00 },

  { name: "Tomatoes", icon: "🍅", category: "Vegetables", price: 5.50 },
  { name: "Potatoes", icon: "🥔", category: "Vegetables", price: 7.00 },
  { name: "Carrots", icon: "🥕", category: "Vegetables", price: 6.50 },
  { name: "Broccoli", icon: "🥦", category: "Vegetables", price: 9.00 },
  { name: "Sweet Corn", icon: "🌽", category: "Vegetables", price: 5.00 },

  { name: "Fresh Bread", icon: "🍞", category: "Bakery", price: 6.00 },
  { name: "Croissants", icon: "🥐", category: "Bakery", price: 11.00 },
  { name: "Bagels", icon: "🥯", category: "Bakery", price: 10.00 },

  { name: "Chicken Breast", icon: "🍗", category: "Meat", price: 27.00 },
  { name: "Premium Beef", icon: "🥩", category: "Meat", price: 42.00 },
  { name: "Fresh Salmon", icon: "🐟", category: "Meat", price: 38.00 },

  { name: "Orange Juice", icon: "🧃", category: "Drinks", price: 12.00 },
  { name: "Mineral Water", icon: "💧", category: "Drinks", price: 3.00 },
  { name: "Cola", icon: "🥤", category: "Drinks", price: 4.50 },
  { name: "Coffee", icon: "☕", category: "Drinks", price: 29.00 },

  { name: "Rice 5KG", icon: "🍚", category: "Pantry", price: 32.00 },
  { name: "Pasta", icon: "🍝", category: "Pantry", price: 7.50 },
  { name: "Olive Oil", icon: "🫒", category: "Pantry", price: 34.00 },
  { name: "Honey", icon: "🍯", category: "Pantry", price: 25.00 },

  { name: "Chocolate", icon: "🍫", category: "Snacks", price: 9.00 },
  { name: "Potato Chips", icon: "🍟", category: "Snacks", price: 7.00 },
  { name: "Cookies", icon: "🍪", category: "Snacks", price: 8.50 },
  { name: "Popcorn", icon: "🍿", category: "Snacks", price: 6.00 },
];

const categories = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Meat",
  "Drinks",
  "Pantry",
  "Snacks",
];

export default function Home() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(0);

  const products = useMemo(() => {
    return groceries.filter((item) => {
      const categoryMatch =
        category === "All" || item.category === category;

      const searchMatch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <main className="market">
      <header className="marketHeader">
        <div className="marketLogo">
          <span>🛒</span>
          <div>
            <strong>BEH MARKET</strong>
            <small>Fresh groceries, delivered fast</small>
          </div>
        </div>

        <div className="marketSearch">
          <span>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search groceries..."
          />
        </div>

        <button className="marketCart">
          🛒 Cart <b>{cart}</b>
        </button>
      </header>

      <section className="marketHero">
        <div>
          <span className="heroBadge">FRESH EVERY DAY</span>
          <h1>
            Your supermarket,
            <br />
            delivered to your door.
          </h1>
          <p>
            Fresh fruits, vegetables, meat, dairy, snacks and everyday
            essentials at great prices.
          </p>
          <a href="#groceries">SHOP GROCERIES</a>
        </div>

        <div className="heroGroceries">
          <span>🥦</span>
          <span>🥛</span>
          <span>🍎</span>
          <span>🥖</span>
          <span>🥩</span>
          <span>🍊</span>
        </div>
      </section>

      <section className="deliveryStrip">
        <div>🚚 <b>Fast Delivery</b><span>Across the UAE</span></div>
        <div>🥬 <b>Always Fresh</b><span>Quality selected daily</span></div>
        <div>💳 <b>Easy Payment</b><span>Secure checkout</span></div>
        <div>⭐ <b>Best Prices</b><span>Everyday savings</span></div>
      </section>

      <section className="categorySection">
        <h2>Shop by category</h2>

        <div className="marketCategories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grocerySection" id="groceries">
        <div className="groceryHeading">
          <div>
            <span>OUR GROCERIES</span>
            <h2>Fresh picks for you</h2>
          </div>

          <strong>{products.length} products</strong>
        </div>

        <div className="groceryGrid">
          {products.map((product) => (
            <article className="groceryCard" key={product.name}>
              <div className="groceryImage">
                <span>{product.icon}</span>
                <small>FRESH</small>
              </div>

              <div className="groceryInfo">
                <small>{product.category}</small>
                <h3>{product.name}</h3>

                <div className="groceryBottom">
                  <div>
                    <span>AED</span>
                    <strong>{product.price.toFixed(2)}</strong>
                  </div>

                  <button onClick={() => setCart((n) => n + 1)}>
                    + ADD
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="marketOffer">
        <div>
          <span>WEEKEND SPECIAL</span>
          <h2>Fresh groceries.<br />Better prices.</h2>
          <p>Save up to 30% on selected fresh products this weekend.</p>
        </div>

        <strong>30%<small>OFF</small></strong>
      </section>

      <footer className="marketFooter">
        <div>
          <b>🛒 BEH MARKET</b>
          <span>Fresh groceries every day.</span>
        </div>

        <p>© 2026 Beh Market · UAE</p>
      </footer>
    </main>
  );
}
