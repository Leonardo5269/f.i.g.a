"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatEuros } from "@/lib/products";

interface CheckoutResponse {
  url?: string;
  error?: string;
}

interface ProductCardProps {
  product: Product;
  graphic: ReactNode;
}

export function ProductCard({ product, graphic }: ProductCardProps) {
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

  const hasPhotos = product.images && product.images.length > 0;

  return (
    <article className="prodotto">
      <div className="grafica prodotto-grafica">
        {hasPhotos ? (
          <Image
            src={product.images![0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="prodotto-foto"
            style={{ objectFit: "cover" }}
          />
        ) : (
          graphic
        )}
      </div>

      <div className="prodotto-corpo">
        <h3 className="prodotto-nome">{product.name}</h3>
        <p className="prodotto-tagline">{product.tagline}</p>

        <dl className="prodotto-meta">
          <div>
            <dt>Fit</dt>
            <dd>{product.fit}</dd>
          </div>
          <div>
            <dt>Materiale</dt>
            <dd>{product.material}</dd>
          </div>
        </dl>

        <p className="prodotto-prezzo">
          {formatEuros(product.priceCents)}&nbsp;€
        </p>

        <button
          type="button"
          className="compra"
          onClick={handleBuyNow}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Ti porto alla cassa…
            </>
          ) : (
            "Compralo ora"
          )}
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
