import type { Metadata } from "next";
import Section from "@/ui/Section/Section";
import CartView from "@/components/CartView/CartView";
import { cn } from "@/utils/ui";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Carrello · F.I.G.A.",
  description: "Il tuo carrello f.i.g.a. — controlla la roba e vai al pagamento.",
};

// Percorso transazionale (Serious Checkout Rule): pagina seria, chiara,
// stesso heading di sezione della home (titolo + divisore tricolore).
export default function CartPage() {
  return (
    <main>
      <Section aria-labelledby="carrello-titolo">
        <h1 id="carrello-titolo" className="text-h2 center-text">
          Carrello
        </h1>
        <div className={cn("tricolore", styles.divisore)} aria-hidden="true" />
        <CartView />
      </Section>
    </main>
  );
}
