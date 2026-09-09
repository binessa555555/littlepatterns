import Link from "next/link";
import "./story.css";

export default function OurStoryPage() {
  return (
    <main className="storyPage">

      {/* HERO */}
      <section className="storyHero">
        <div className="storyHeroOverlay" />

        <nav className="storyNav">
          <Link href="/">← Little Patterns</Link>
          <span>OUR STORY</span>
          <Link href="/#fabrics">Explore Fabrics</Link>
        </nav>

        <div className="storyHeroContent">
          <p className="storyEyebrow">LITTLE PATTERNS</p>

          <h1>
            It Starts<br />
            With a Pattern
          </h1>

          <p className="storyIntro">
            We believe the right fabric can be the beginning of
            something completely your own.
          </p>

          <span className="scrollText">OUR STORY ↓</span>
        </div>
      </section>


      {/* WHY LITTLE PATTERNS */}
      <section className="storyOpening">
        <p className="chapterNumber">I</p>

        <h2>
          We fell in love<br />
          with the possibilities.
        </h2>

        <p>
          Little Patterns began with a simple idea: finding beautiful
          fabrics should feel inspiring.
        </p>

        <p>
          We wanted to create a collection where every pattern could
          spark an idea — a dress imagined for an occasion, an abaya
          made differently, or a piece designed simply because you
          could already picture it the moment you saw the fabric.
        </p>
      </section>


      {/* INSPIRATION */}
      <section className="country france">
        <div className="countryImage">
          <div className="countryLabel">
            <span>01</span>
            <p>INSPIRATION</p>
          </div>
        </div>

        <div className="countryText">
          <p className="smallTitle">WHERE WE LOOK</p>

          <h2>
            Inspiration<br />
            is everywhere.
          </h2>

          <p>
            A garden in the south of France. The colours of an old
            Italian interior. A floral wallpaper in an English country
            house. A painting, a dress, a photograph, or even a detail
            noticed for only a moment.
          </p>

          <p>
            We are drawn to patterns with character — florals,
            botanicals, paisleys and expressive colour combinations
            that feel beautiful without feeling ordinary.
          </p>

          <blockquote>
            “Sometimes one pattern is enough to imagine the entire piece.”
          </blockquote>
        </div>
      </section>


      {/* CHOOSING */}
      <section className="country italy">
        <div className="countryText">
          <p className="smallTitle">THE COLLECTION</p>

          <h2>
            Chosen with<br />
            a purpose.
          </h2>

          <p>
            We do not want Little Patterns to feel like an endless
            catalogue of fabric.
          </p>

          <p>
            Each design is chosen because we can imagine what it could
            become. We look for colour, detail and patterns that can
            stand beautifully on their own while still leaving room
            for your creativity.
          </p>

          <p>
            Some are soft and romantic. Some are bold. Some feel
            timeless. They do not need to look alike — they only need
            to make you want to create.
          </p>
        </div>

        <div className="countryImage">
          <div className="countryLabel">
            <span>02</span>
            <p>THE DETAILS</p>
          </div>
        </div>
      </section>


      {/* CUSTOMER */}
      <section className="country britain">
        <div className="countryImage">
          <div className="countryLabel">
            <span>03</span>
            <p>YOUR IDEA</p>
          </div>
        </div>

        <div className="countryText">
          <p className="smallTitle">WHAT COMES NEXT</p>

          <h2>
            The fabric is<br />
            only the beginning.
          </h2>

          <p>
            We choose the pattern. You decide what it becomes.
          </p>

          <p>
            The same fabric can become completely different pieces in
            different hands. An elegant dress. A flowing abaya. A
            kaftan. A statement piece made for one particular moment.
          </p>

          <p>
            That is what we love most about fabric: before it is cut,
            it is full of possibilities.
          </p>

          <blockquote>
            “Your idea is what gives the pattern its final form.”
          </blockquote>
        </div>
      </section>


      {/* BRAND */}
      <section className="ourBeginning">
        <p className="storyEyebrow">LITTLE PATTERNS</p>

        <h2>
          Small details.<br />
          Beautiful beginnings.
        </h2>

        <p>
          The name Little Patterns comes from the details we notice
          first — the small flowers, lines, colours and shapes that
          together can completely change a piece.
        </p>

        <p>
          We created Little Patterns for people who see a fabric and
          immediately begin imagining what they could make from it.
        </p>
      </section>


      {/* FINAL */}
      <section className="fabricStory">
        <div className="fabricStatement">
          <p className="chapterNumber">IV</p>

          <h2>
            From our collection<br />
            to your creation.
          </h2>

          <p>
            We provide the starting point.
          </p>

          <p>
            What happens next belongs to you — your measurements,
            your style, your occasion and your imagination.
          </p>

          <p>
            No two ideas have to be the same. And that is exactly
            the point.
          </p>
        </div>
      </section>


      {/* END */}
      <section className="storyEnding">
        <p>LITTLE PATTERNS</p>

        <h2>
          Find the pattern<br />
          that starts your idea.
        </h2>

        <Link href="/#fabrics" className="storyButton">
          EXPLORE THE FABRICS
        </Link>
      </section>

    </main>
  );
}
