"use client";
import Image from "next/image";
import { useState } from "react";
import { products } from "@/data/products";

export default function Home() {
  const [selectedFabric, setSelectedFabric] = useState<null | {
    name: string;
    image: string;
  }>(null);
  const [viewerPage, setViewerPage] = useState(1);
  const [zoom, setZoom] = useState(1);

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
            

            <p className="mt-6 text-lg md:text-xl leading-relaxed text-slate-600">
              Where every beautiful thing begins, and elegance is in every thread.
            </p>

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
              <button
                type="button"
                onClick={() => {
                  setSelectedFabric({
                    name: product.name,
                    image: product.image,
                  });
                  setViewerPage(1);
                  setZoom(1);
                }}
                className="relative block w-full overflow-hidden rounded-[2rem] bg-white"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={900}
                  height={900}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </button>

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
            Thirty prints. Endless possibilities. Find the pattern that turns your next piece into something unforgettable.</p>
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
    
      {selectedFabric && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedFabric(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedFabric(null)}
              className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow-lg"
            >
              ×
            </button>

            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#f5f3ef]">
              <div className="absolute left-4 top-4 z-20 rounded-2xl bg-white/90 px-4 py-2 text-sm shadow-sm">
                {viewerPage} / 2
                <div className="text-xs text-slate-500">
                  {viewerPage === 1
                    ? "Fabric Detail"
                    : "Worn in Emirati Style"}
                </div>
              </div>

              {viewerPage === 1 ? (
                <div className="flex min-h-[500px] items-center justify-center overflow-hidden p-4 md:min-h-[650px]">
                  <Image
                    src={selectedFabric.image}
                    alt={selectedFabric.name}
                    width={1200}
                    height={1200}
                    draggable={false}
                    className="max-h-[70vh] w-auto object-contain transition-transform duration-200"
                    style={{
                      transform: `scale(${zoom})`,
                    }}
                  />
                </div>
              ) : (
                <div className="flex min-h-[500px] items-center justify-center md:min-h-[650px]">
                  <Image
                    src={`/models/${selectedFabric.image
                      .split("/")
                      .pop()
                      ?.replace(".webp", "-model.webp")}`}
                    alt={`${selectedFabric.name} worn in Emirati style`}
                    width={1000}
                    height={1200}
                    className="h-[70vh] w-auto max-w-full object-contain scale-[1.85]"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setViewerPage(viewerPage === 1 ? 2 : 1);
                  setZoom(1);
                }}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewerPage(viewerPage === 1 ? 2 : 1);
                  setZoom(1);
                }}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg"
              >
                ›
              </button>

              {viewerPage === 1 && (
                <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/95 p-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() =>
                      setZoom((z) => Math.max(1, z - 0.5))
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full text-2xl"
                  >
                    −
                  </button>

                  <span className="min-w-[60px] text-center text-sm">
                    {Math.round(zoom * 100)}%
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setZoom((z) => Math.min(4, z + 0.5))
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full text-2xl"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between gap-4 px-2 pb-1 pt-5 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold text-[#0b3f7c]">
                  {selectedFabric.name}
                </h2>
                <p className="mt-1 text-lg text-[#0b3f7c]">
                  AED 250
                </p>
              </div>

              <button
                type="button"
                onClick={() => buyNow(selectedFabric.name, 250)}
                className="rounded-full bg-[#0b3f7c] px-8 py-3 text-white"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

</main>
  );
}