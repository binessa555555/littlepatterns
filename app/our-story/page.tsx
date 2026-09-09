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
          <Link href="/#collection">Explore Fabrics</Link>
        </nav>

        <div className="storyHeroContent">
          <p className="storyEyebrow">LITTLE PATTERNS</p>
          <h1>A Story<br />Woven Through Time</h1>
          <p className="storyIntro">
            Before a fabric becomes a dress, it begins as an idea.
            A colour remembered. A garden passed on an afternoon walk.
            A detail that stays with you.
          </p>

          <span className="scrollText">SCROLL TO DISCOVER ↓</span>
        </div>
      </section>


      {/* INTRO */}
      <section className="storyOpening">
        <p className="chapterNumber">I</p>

        <h2>
          Every pattern<br />
          begins somewhere.
        </h2>

        <p>
          Little Patterns was born from a fascination with the places,
          objects and memories that make beautiful design feel timeless.
          Not one era. Not one country. But generations of colour,
          craftsmanship and imagination.
        </p>
      </section>


      {/* FRANCE */}
      <section className="country france">
        <div className="countryImage">
          <div className="countryLabel">
            <span>01</span>
            <p>FRANCE</p>
          </div>
        </div>

        <div className="countryText">
          <p className="smallTitle">THE ROMANCE OF PATTERN</p>

          <h2>
            Where flowers<br />
            became stories.
          </h2>

          <p>
            In France, inspiration lives quietly. In gardens growing
            beyond their borders. In faded wallpapers. In botanical
            drawings preserved between the pages of old books.
          </p>

          <p>
            From these details came our appreciation for florals that
            feel effortless rather than perfect — petals, leaves and
            ornamental forms arranged with the softness of something
            remembered.
          </p>

          <blockquote>
            “Some patterns are not designed to be noticed first.
            They are designed to be remembered.”
          </blockquote>
        </div>
      </section>


      {/* ITALY */}
      <section className="country italy">
        <div className="countryText">
          <p className="smallTitle">THE ART OF LIVING BEAUTIFULLY</p>

          <h2>
            Colour without<br />
            apology.
          </h2>

          <p>
            Italy brought something different to our story: confidence.
            Rich colour, expressive ornament and the belief that
            beautiful things should be lived in, touched and worn —
            not simply admired from a distance.
          </p>

          <p>
            It inspired the bolder side of Little Patterns. Prints with
            movement. Colours with presence. Fabrics created for pieces
            that enter a room before a word is spoken.
          </p>
        </div>

        <div className="countryImage">
          <div className="countryLabel">
            <span>02</span>
            <p>ITALY</p>
          </div>
        </div>
      </section>


      {/* BRITAIN */}
      <section className="country britain">
        <div className="countryImage">
          <div className="countryLabel">
            <span>03</span>
            <p>BRITAIN</p>
          </div>
        </div>

        <div className="countryText">
          <p className="smallTitle">BEAUTY THAT AGES WELL</p>

          <h2>
            Made for more<br />
            than one season.
          </h2>

          <p>
            British country houses, antique wallpapers and gardens
            taught us another lesson: beautiful pattern does not need
            to belong to a moment.
          </p>

          <p>
            The most memorable designs become richer with time.
            Florals soften. Colours become familiar. A pattern becomes
            connected to a place, a person, a memory.
          </p>

          <blockquote>
            “Timeless does not mean old. It means worth keeping.”
          </blockquote>
        </div>
      </section>


      {/* TRANSITION */}
      <section className="ourBeginning">
        <p className="storyEyebrow">AND THEN</p>

        <h2>
          Our story<br />
          begins.
        </h2>

        <p>
          Little Patterns brings these influences together without
          trying to recreate the past.
        </p>

        <p>
          We take the romance, character and confidence of old
          European design and reinterpret them as fabrics made for
          something entirely new.
        </p>
      </section>


      {/* FABRIC STATEMENT */}
      <section className="fabricStory">
        <div className="fabricStatement">
          <p className="chapterNumber">IV</p>

          <h2>
            From pattern<br />
            to possibility.
          </h2>

          <p>
            To us, every roll of fabric is unfinished.
          </p>

          <p>
            Its final chapter belongs to the person who chooses it —
            transformed into a dress, an abaya, a kaftan, or something
            we could never have imagined ourselves.
          </p>
        </div>
      </section>


      {/* END */}
      <section className="storyEnding">
        <p>LITTLE PATTERNS</p>

        <h2>
          Made to inspire<br />
          what comes next.
        </h2>

        <Link href="/#collection" className="storyButton">
          EXPLORE THE COLLECTION
        </Link>
      </section>

    </main>
  );
}
