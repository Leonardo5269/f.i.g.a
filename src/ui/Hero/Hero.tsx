import Image from "next/image";
import Button from "@/ui/Button/Button";
import styles from "./Hero.module.scss";

/** Hero manifesto: momento brand dark, due colonne (proclama + foto). */
export default function Hero() {
  return (
    <section className="dark" aria-labelledby="hero-titolo">
      <div className={styles.inner}>
        <div className={styles.testo}>
          <p className="eyebrow">Nuovi Arrivi</p>
          <h1 id="hero-titolo" className="text-h1">
            Facciamo
            <br />
            Italia
            <br />
            Grande
            <br />
            Ancora.
          </h1>
          <p className={styles.sub}>
            Merch patriottico. Ignoranza di qualità, 100% Made in Italy.
          </p>
          <Button
            href="#la-roba"
            variant="filled"
            size="lg"
            className={styles.cta}
          >
            Compra Ora
          </Button>
        </div>

        <div className={styles.immagine}>
          <Image
            src="/hero.jpg"
            alt="Uomo di spalle con felpa nera F.I.G.A."
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.foto}
            priority
          />
        </div>
      </div>
    </section>
  );
}
