"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatEuros } from "@/lib/products";
import Button from "@/ui/Button/Button";
import styles from "./ProductCard.module.scss";

interface CheckoutResponse {
  url?: string;
  error?: string;
}

interface ProductCardProps {
  product: Product;
}

/**
 * Card prodotto: una card = una decisione (PRODUCT.md). Il click apre la
 * Stripe Checkout Session per quel singolo articolo — il prezzo lo risolve
 * il server da lib/products, il client manda solo l'id.
 */
export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuyNow(): Promise<void> {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });

      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok || !data.url) {
        throw new Error(
          data.error ??
            "Impossibile aprire la cassa. Riprova tra qualche istante.",
        );
      }

      window.location.assign(data.url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Errore di rete. Controlla la connessione e riprova.",
      );
      setLoading(false);
    }
  }

  return (
    <article className={styles.card}>
      {product.badge && <span className={styles.badge}>{product.badge}</span>}

      <div className={styles.media}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={styles.foto}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>
            &euro;{formatEuros(product.priceCents)}
          </p>
        </div>

        <Button
          variant="outline"
          block
          loading={loading}
          onClick={handleBuyNow}
        >
          {loading ? "Attendi…" : "Aggiungi al carrello"}
        </Button>

        {error !== null && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    </article>
  );
}
