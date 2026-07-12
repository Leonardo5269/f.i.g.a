"use client";

import { useState } from "react";
import Image from "next/image";
import { BsCartPlus } from "react-icons/bs";
import type { Product } from "@/lib/products";
import { formatEuros, discountPercent, GARMENT_LABEL } from "@/lib/products";
import Button from "@/ui/Button/Button";
import { cn } from "@/utils/ui";
import styles from "./ProductDetail.module.scss";

interface ProductDetailProps {
  product: Product;
}

/**
 * Scheda prodotto: immagine a sinistra, testo a destra (stack su mobile).
 * Colore e taglia sono selezionabili — l'anteprima segue il colore — ma le
 * CTA restano INATTIVE: il flusso d'acquisto sarà ridisegnato col backend.
 */
export default function ProductDetail({ product }: ProductDetailProps) {
  const colors = product.colors ?? [];
  const sizes = product.sizes ?? [];

  const [colorIndex, setColorIndex] = useState<number>(0);
  const [size, setSize] = useState<string | null>(null);

  const image = colors[colorIndex]?.image ?? product.image;
  const list = product.originalPriceCents;
  const onSale = list !== undefined && list > product.priceCents;
  const off = discountPercent(product);

  return (
    <div className={styles.layout}>
      <div className={styles.gallery}>
        <div className={styles.media}>
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 1080px) 100vw, 50vw"
            className={styles.foto}
            priority
          />
          {product.badge && (
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
        </div>
      </div>

      <div className={styles.info}>
        <p className={cn("label", styles.tipo)}>{GARMENT_LABEL[product.type]}</p>
        <h1 id="prodotto-nome" className={styles.name}>
          {product.name}
        </h1>

        <div className={styles.priceRow}>
          <span className={styles.price}>
            &euro;{formatEuros(product.priceCents)}
          </span>
          {onSale && list !== undefined && (
            <>
              <span className={styles.priceOld}>&euro;{formatEuros(list)}</span>
              {off !== null && <span className={styles.off}>-{off}%</span>}
            </>
          )}
        </div>

        <p className={styles.description}>{product.description}</p>

        {colors.length > 0 && (
          <div className={styles.field}>
            <p className={styles.fieldLabel}>
              Colore:{" "}
              <span className={styles.fieldValue}>{colors[colorIndex].name}</span>
            </p>
            <div
              className={styles.swatches}
              role="group"
              aria-label="Scegli il colore"
            >
              {colors.map((color, index) => (
                <button
                  key={color.name}
                  type="button"
                  className={cn(
                    styles.swatch,
                    index === colorIndex && styles.swatchActive,
                  )}
                  style={{ background: color.swatch }}
                  aria-label={color.name}
                  aria-pressed={index === colorIndex}
                  title={color.name}
                  onClick={() => setColorIndex(index)}
                />
              ))}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div className={styles.field}>
            <p className={styles.fieldLabel}>Taglia</p>
            <div
              className={styles.sizes}
              role="group"
              aria-label="Scegli la taglia"
            >
              {sizes.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={cn(styles.size, value === size && styles.sizeActive)}
                  aria-pressed={value === size}
                  onClick={() => setSize(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.material && (
          <p className={styles.material}>
            <span className={styles.materialLabel}>Materiale</span>
            {product.material}
          </p>
        )}

        <div className={styles.actions}>
          <Button variant="filled" size="lg" block disabled>
            Compra ora
          </Button>
          <Button
            variant="outline"
            size="lg"
            block
            disabled
            className={styles.cartButton}
          >
            <BsCartPlus className={styles.cartIcon} aria-hidden="true" />
            <span>Aggiungi al carrello</span>
          </Button>
        </div>
        <p className={styles.note}>Acquisti non ancora attivi.</p>
      </div>
    </div>
  );
}
