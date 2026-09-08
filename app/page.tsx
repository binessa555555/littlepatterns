"use client";
import Image from "next/image";
import { products } from "@/data/products";

export default function Home() {
    async function buyNow(productName: string, price: number) {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          price: price,
          quantity: 1,
        }),
      });

      const data = await response.json();

if (!response.ok) {
  alert(data.error || "Checkout failed");
  return;
}

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to start checkout.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }
  return (
    <main className="min-h-screen bg-[#f7fbf8] text-[#0b3f7c]">
      <header className="sticky top-0 z-50 border-b border-[#0b3f7c]/10 bg-[#f7fbf8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="/brand/little-patterns-logo.webp"
              alt="Little Patterns Première Fabrics"
              width={260}
              height={120}
              className="h-14 w-auto object-contain"
              priority
            />
          </a>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#fabrics" className="transition hover:opacity-60">
              Fabrics
            </a>
            <a href="#about" className="transition hover:opacity-60">
              Our Story
            </a>
            <a href="#contact" className="transition hover:opacity-60">
              Contact
            </a>
          </nav>

          <a
            href="#fabrics"
            className="rounded-full bg-[#0b3f7c] px-5 py-2.5 text-sm text-white transition hover:opacity-90"
          >
            Shop Fabrics
          </a>
        </div>
      </header>

      <section id="top" className="border-b border-[#0b3f7c]/10 bg-[#dff3e8]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em]">
              Première Fabrics
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold leading-tight md:text-7xl">
              Beautiful patterns for exceptional pieces.
            </h1>
            

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#fabrics"
                className="rounded-full bg-[#0b3f7c] px-7 py-3.5 text-sm uppercase tracking-[0.16em] text-white"
              >
                Explore Collection
              </a>
              <span className="rounded-full border border-[#0b3f7c]/20 px-5 py-3 text-sm">
                
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={product.name}
                className={index % 2 === 1 ? "translate-y-8" : ""}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={700}
                  height={700}
                  className="aspect-square w-full rounded-[2rem] object-cover shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fabrics" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em]">Made to Be Noticed</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
              All Fabrics
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#0b3f7c]/65">
            
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="group">
              <div className="relative overflow-hidden rounded-[2rem] bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={900}
                  height={900}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-lg font-semibold">
                    AED {product.price.toFixed(2)}
                  </span>
                  
                </div>
                <button
  onClick={() => buyNow(product.name, product.price)}
  className="mt-4 mr-3 inline-flex rounded-full bg-[#0b3f7c] px-5 py-2.5 text-sm text-white transition hover:opacity-80"
>
  Buy Now
</button><a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Hello, I am interested in ${product.name} from Little Patterns.`
                  )}`}
                  className="mt-4 inline-flex rounded-full border border-[#0b3f7c] px-5 py-2.5 text-sm transition hover:bg-[#0b3f7c] hover:text-white"
                >
                  Ask about this fabric
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[#0b3f7c] px-5 py-20 text-white md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Little Patterns
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Première fabrics chosen to inspire your next design.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/75">
            Our collection brings together floral, paisley, damask and
            ornamental patterns in a wide range of colours, from midnight tones
            to coral, blush, teal and gold.
          </p>
        </div>
      </section>

      <footer id="contact" className="bg-[#062b58] px-5 py-12 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Little Patterns</p>
            <p className="mt-1 text-sm text-white/60">
              Première Fabrics · Dubai, UAE
            </p>
          </div>
          <p className="text-sm text-white/60">
            © 2026 Little Patterns. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}