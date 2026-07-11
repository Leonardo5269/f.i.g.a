"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatEuros } from "@/lib/products";

interface CheckoutResponse {
  url?: string;
  error?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
          data.error ?? "Impossibile aprire la cassa. Riprova tra qualche istante."
        );
      }

      window.location.assign(data.url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Errore di rete. Controlla la connessione e riprova."
      );
      setLoading(false);
    }
  }

  return (
    <article className="prodotto">
      {product.badge && <span className="prodotto-badge">{product.badge}</span>}

      <div className="prodotto-foto-wrap">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="prodotto-foto"
        />
      </div>

      <div className="prodotto-corpo">
        <div className="prodotto-riga">
          <h3 className="prodotto-nome">{product.name}</h3>
          <p className="prodotto-prezzo">&euro;{formatEuros(product.priceCents)}</p>
        </div>

        <button
          type="button"
          className="prodotto-bottone"
          onClick={handleBuyNow}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "ATTENDI…" : "AGGIUNGI AL CARRELLO"}
        </button>

        {error !== null && (
          <p className="prodotto-errore" role="alert">
            {error}
          </p>
        )}
      </div>
    </article>
  );
}
