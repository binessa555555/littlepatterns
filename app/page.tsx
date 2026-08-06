const collections = [
  {
    name: "Silk Collection",
    description: "Soft, refined fabrics with an elegant finish.",
    image:
      "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Printed Cotton",
    description: "Distinctive patterns designed for everyday luxury.",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Signature Fabrics",
    description: "Exclusive materials selected for special pieces.",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#1c1a17]">
      <header className="absolute left-0 top-0 z-20 w-full border-b border-white/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-white">
          <h1 className="text-xl font-medium tracking-[0.28em]">
            LITTLE PATTERNS
          </h1>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#collections" className="hover:opacity-70">
              Collections
            </a>
            <a href="#about" className="hover:opacity-70">
              Our Story
            </a>
            <a href="#contact" className="hover:opacity-70">
              Contact
            </a>
          </nav>

          <button className="border border-white px-5 py-2 text-sm transition hover:bg-white hover:text-black">
            Shop
          </button>
        </div>
      </header>

      <section
        className="relative flex min-h-screen items-end bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.22), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=2000&q=90')",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 text-white md:pb-28">
          <p className="mb-5 text-sm uppercase tracking-[0.35em]">
            Curated luxury fabrics
          </p>

          <h2 className="max-w-4xl text-5xl font-light leading-tight md:text-7xl">
            Patterns made to become something beautiful.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
            A carefully selected collection of silk, cotton and distinctive
            printed fabrics.
          </p>

          <a
            href="#collections"
            className="mt-9 inline-block bg-white px-8 py-4 text-sm uppercase tracking-[0.2em] text-black transition hover:bg-[#e8dfcf]"
          >
            Explore Collection
          </a>
        </div>
      </section>

      <section id="collections" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8d7151]">
            Discover
          </p>
          <h2 className="mt-4 text-4xl font-light md:text-5xl">
            Our Collections
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {collections.map((collection) => (
            <article key={collection.name} className="group">
              <div
                className="h-[480px] overflow-hidden bg-cover bg-center transition duration-700 group-hover:scale-[1.02]"
                style={{ backgroundImage: `url('${collection.image}')` }}
              />

              <h3 className="mt-6 text-2xl font-light">{collection.name}</h3>
              <p className="mt-2 leading-7 text-black/60">
                {collection.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[#1e211c] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d8c5a3]">
            Little Patterns
          </p>

          <div>
            <h2 className="text-4xl font-light leading-tight md:text-5xl">
              Fabrics selected with character, quality and timeless style.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-white/70">
              Our aim is to make beautiful fabrics easier to discover. Every
              collection is selected to offer colour, detail and elegance for
              unique garments and creative designs.
            </p>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#121310] px-6 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="tracking-[0.25em]">LITTLE PATTERNS</p>
            <p className="mt-2 text-sm text-white/50">Dubai, United Arab Emirates</p>
          </div>

          <p className="text-sm text-white/50">
            © 2026 Little Patterns. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}