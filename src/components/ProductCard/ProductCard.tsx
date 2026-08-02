"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatEuros, GARMENT_LABEL } from "@/lib/products";
import { cn } from "@/utils/ui";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

/**
 * Card prodotto (sezione light). Non è più un pulsante d'acquisto: l'intera
 * card è un link alla pagina dell'indumento. In hover su un quadratino
 * colore l'anteprima mostra quella variante (per ora tutte puntano allo
 * scatto esistente, finché non arrivano le foto per colore).
 *
 * Un prodotto `comingSoon` resta in griglia ma non è cliccabile: foto attenuata
 * con overlay "Coming Soon", niente swatch/badge/prezzo (non ancora in vendita).
 */
export default function ProductCard({ product }: ProductCardProps) {
  const colors = product.colors ?? [];
  const [preview, setPreview] = useState<string>(
    colors[0]?.image ?? product.image,
  );

  const list = product.originalPriceCents;
  const onSale = list !== undefined && list > product.priceCents;
  const comingSoon = product.comingSoon === true;

  const contenuto = (
    <>
      <div className={styles.media}>
        <Image
          src={preview}
          alt={product.name}
          fill
          sizes="(max-width: 521px) 100vw, (max-width: 1080px) 50vw, 33vw"
          className={styles.foto}
        />
        {comingSoon && (
          <span className={styles.soonTag}>Coming Soon</span>
        )}
      </div>

      <div className={styles.body}>
        {!comingSoon && colors.length > 0 && (
          <ul
            className={styles.swatches}
            aria-label={`Colori: ${colors.map((c) => c.name).join(", ")}`}
          >
            {colors.map((color) => (
              <li key={color.name}>
                <span
                  className={styles.swatch}
                  style={{ background: color.swatch }}
                  title={color.name}
                  aria-hidden="true"
                  onMouseEnter={() => setPreview(color.image)}
                />
              </li>
            ))}
          </ul>
        )}

        {!comingSoon && product.badge && (
          <span
            className={cn(
              styles.badge,
              product.badge.tone === "rilievo"
                ? styles.badgeRilievo
                : styles.badgeNeutro,
            )}
          >
            {product.badge.label}
          </span>
        )}

        <div>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.type} style={{ marginTop: "4px" }}>
            {GARMENT_LABEL[product.type]}
          </p>
        </div>

        {!comingSoon && (
          <p className={styles.priceRow}>
            <span className={styles.price}>
              &euro;{formatEuros(product.priceCents)}
            </span>
            {onSale && list !== undefined && (
              <span className={styles.priceOld}>&euro;{formatEuros(list)}</span>
            )}
          </p>
        )}
      </div>
    </>
  );

  return (
    <article className={cn(styles.card, comingSoon && styles.isSoon)}>
      {comingSoon ? (
        <div className={styles.link} aria-label={`${product.name} — Coming Soon`}>
          {contenuto}
        </div>
      ) : (
        <Link
          href={`/prodotti/${product.id}`}
          className={styles.link}
          aria-label={product.name}
        >
          {contenuto}
        </Link>
      )}
    </article>
  );
}
