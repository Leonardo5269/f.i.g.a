"use client";

import { formatEuros } from "@/lib/products";
import { useCart } from "@/features/cart/CartContext";
import { lineKey } from "@/features/cart/cart";
import { useCheckout } from "@/features/cart/useCheckout";
import Button from "@/ui/Button/Button";
import CartLineItem from "./CartLineItem";
import styles from "./CartView.module.scss";

/**
 * Contenuto della pagina /carrello: righe articolo + riepilogo.
 * Percorso transazionale (Serious Checkout Rule): serio e ad alto
 * contrasto; l'unico rosso della pagina è il bottone "Pagamento"
 * (o la CTA dell'empty state, quando il riepilogo non c'è).
 */
export default function CartView() {
  const { items, hydrated, subtotal } = useCart();
  const { start, pending, error } = useCheckout();

  // Lo storage si legge solo sul client: prima dell'idratazione non
  // mostriamo nulla (né righe né "carrello vuoto") per evitare flash.
  if (!hydrated) {
    return <div className={styles.placeholder} aria-hidden="true" />;
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Il carrello è vuoto. Rimedia subito.</p>
        <Button variant="filled" size="lg" href="/#la-roba">
          Scopri la Roba
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <ul className={styles.lines}>
        {items.map((item) => (
          <CartLineItem key={lineKey(item)} item={item} />
        ))}
      </ul>

      <aside className={styles.summary} aria-label="Riepilogo ordine">
        <div className={styles.subtotalRow}>
          <span>Subtotale</span>
          <span className={styles.subtotal}>&euro;{formatEuros(subtotal)}</span>
        </div>
        <p className={styles.shippingNote}>
          Spedizione e totale calcolati al pagamento.
        </p>
        <Button
          variant="filled"
          size="lg"
          block
          loading={pending}
          onClick={() => start(items)}
        >
          Pagamento
        </Button>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </aside>
    </div>
  );
}
