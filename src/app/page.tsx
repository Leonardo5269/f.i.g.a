import { PRODUCTS } from "@/lib/products";
import Hero from "@/ui/Hero/Hero";
import Section from "@/ui/Section/Section";
import Closure from "@/ui/Closure/Closure";
import ProductCard from "@/components/ProductCard/ProductCard";
import { cn } from "@/utils/ui";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <Section id="la-roba" aria-labelledby="prodotti-titolo">
        <h2 id="prodotti-titolo" className="text-h2 center-text">
          La Roba
        </h2>
        <div className={cn("tricolore", styles.divisore)} aria-hidden="true" />

        <div className={styles.griglia}>
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Closure />
    </main>
  );
}
