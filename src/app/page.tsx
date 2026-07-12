import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ContactForm } from "@/components/ContactForm";

export default function HomePage() {
  return (
    <>
      <header className="testata">
        <Image
          src="/logo.svg"
          alt="F.I.G.A."
          width={128}
          height={128}
          className="testata-logo"
          priority
        />
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-titolo">
          <div className="hero-testo">
            <p className="hero-eyebrow">Nuovi Arrivi</p>
            <h1 id="hero-titolo" className="hero-titolo">
              Facciamo
              <br />
              Italia
              <br />
              Grande
              <br />
              Ancora.
            </h1>
            <p className="hero-sub">
              Merch patriottico. Ignoranza di qualità, 100% Made in Italy.
            </p>
            <a href="#la-roba" className="bottone-primario hero-cta">
              Compra Ora
            </a>
          </div>

          <div className="hero-immagine">
            <Image
              src="/hero.jpg"
              alt="Uomo di spalle con felpa nera F.I.G.A."
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="hero-foto"
              priority
            />
          </div>
        </section>

        <section
          className="prodotti"
          id="la-roba"
          aria-labelledby="prodotti-titolo"
        >
          <h2 id="prodotti-titolo" className="prodotti-titolo">
            La Roba
          </h2>
          <div className="tricolore-riga" aria-hidden="true" />

          <div className="prodotti-griglia">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="chiusura" aria-labelledby="chiusura-titolo">
          <h2 id="chiusura-titolo" className="chiusura-titolo">
            L&rsquo;Italia ti guarda.
            <br />
            Vestiti bene.
          </h2>
          <p className="chiusura-sub">
            Hai domande? Vuoi insultarci? Compila il form qui sotto. Ti
            risponderemo (forse) quando finisce la partita.
          </p>

          <ContactForm />
        </section>
      </main>

      <footer className="fondo">
        <div className="tricolore-riga" aria-hidden="true" />
        <div className="fondo-corpo">
          <Image
            src="/logo.svg"
            alt="F.I.G.A."
            width={72}
            height={54}
            className="fondo-logo"
          />

          <nav className="fondo-link" aria-label="Link legali">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Shipping</a>
            <a href="#">Contact</a>
          </nav>

          <p className="fondo-copy">
            &copy; 2026 F.I.G.A. Italia. All rights reserved.
          </p>
        </div>
        <p className="fondo-tagline">
          Ignoranza di qualità. 100% Made in Italy.
        </p>
      </footer>
    </>
  );
}
