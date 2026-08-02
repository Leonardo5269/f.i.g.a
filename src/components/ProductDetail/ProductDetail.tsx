"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import type { Product } from "@/lib/products";
import { formatEuros, discountPercent, GARMENT_LABEL } from "@/lib/products";
import { useCart } from "@/features/cart/CartContext";
import { useCheckout, type CheckoutLine } from "@/features/cart/useCheckout";
import Button from "@/ui/Button/Button";
import QtyStepper from "@/components/QtyStepper/QtyStepper";
import { cn } from "@/utils/ui";
import styles from "./ProductDetail.module.scss";

interface ProductDetailProps {
  product: Product;
}

/**
 * Scheda prodotto: immagine a sinistra, testo a destra (stack su mobile).
 * Sia "Aggiungi al carrello" sia "Compra ora" pretendono taglia e colore
 * (quando il prodotto li ha): "Compra ora" avvia il checkout Stripe diretto
 * per questa sola riga, senza passare dal carrello.
 */
export default function ProductDetail({ product }: ProductDetailProps) {
  const colors = product.colors ?? [];
  const sizes = product.sizes ?? [];
  const { addItem } = useCart();
  const { start: startCheckout, pending: buying, error: checkoutError } =
    useCheckout();

  // Colore: nessuna preselezione — la scelta è dell'utente (con un solo
  // colore, come la sciarpa, non c'è nulla da scegliere: preselezionato).
  const [colorIndex, setColorIndex] = useState<number | null>(
    colors.length === 1 ? 0 : null,
  );
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const image =
    colorIndex !== null ? (colors[colorIndex]?.image ?? product.image) : product.image;
  const list = product.originalPriceCents;
  const onSale = list !== undefined && list > product.priceCents;
  const off = discountPercent(product);

  const pickColor = (index: number) => {
    setColorIndex(index);
    setError(null);
  };

  const pickSize = (value: string) => {
    setSize(value);
    setError(null);
  };

  // Valida la selezione (taglia/colore obbligatori quando esistono) e
  // costruisce la riga; se manca qualcosa imposta l'errore e ritorna null.
  const buildLine = (): CheckoutLine | null => {
    const needsSize = sizes.length > 0 && size === null;
    const needsColor = colors.length > 0 && colorIndex === null;

    if (needsSize || needsColor) {
      setError(
        needsSize && needsColor
          ? "Seleziona taglia e colore"
          : needsSize
            ? "Seleziona una taglia"
            : "Seleziona un colore",
      );
      return null;
    }

    setError(null);
    return {
      productId: product.id,
      size,
      color: colorIndex !== null ? (colors[colorIndex]?.name ?? null) : null,
      qty,
    };
  };

  const handleAddToCart = () => {
    const line = buildLine();
    if (line) addItem(line);
  };

  const handleBuyNow = () => {
    const line = buildLine();
    if (line) startCheckout([line]);
  };

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
              <span className={styles.fieldValue}>
                {colorIndex !== null ? colors[colorIndex].name : "Seleziona"}
              </span>
            </p>
            <div
              className={styles.swatches}
              role="group"
              aria-label="Scegli il colore"
              aria-describedby={error ? "selezione-errore" : undefined}
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
                  onClick={() => pickColor(index)}
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
              aria-describedby={error ? "selezione-errore" : undefined}
            >
              {sizes.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={cn(styles.size, value === size && styles.sizeActive)}
                  aria-pressed={value === size}
                  onClick={() => pickSize(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.field}>
          <p className={styles.fieldLabel}>Quantità</p>
          <div className={styles.qty}>
            <QtyStepper value={qty} onChange={setQty} />
          </div>
        </div>

        {product.material && (
          <p className={styles.material}>
            <span className={styles.materialLabel}>Materiale</span>
            {product.material}
          </p>
        )}

        {error && (
          <p id="selezione-errore" className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.actions}>
          <Button
            variant="filled"
            size="lg"
            block
            loading={buying}
            onClick={handleBuyNow}
          >
            Compra ora
          </Button>
          <Button
            variant="outline"
            size="lg"
            block
            className={styles.cartButton}
            onClick={handleAddToCart}
          >
            <FaCartPlus className={styles.cartIcon} aria-hidden="true" />
            <span>Aggiungi al carrello</span>
          </Button>
        </div>
        {checkoutError && (
          <p className={styles.error} role="alert">
            {checkoutError}
          </p>
        )}
        <p className={styles.note}>
          Pagamento sicuro con Stripe · spedizione calcolata al checkout.
        </p>
      </div>
    </div>
  );
}
