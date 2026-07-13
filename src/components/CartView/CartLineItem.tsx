"use client";

import Link from "next/link";
import Image from "next/image";
import { formatEuros, getProductById } from "@/lib/products";
import { useCart } from "@/features/cart/CartContext";
import { lineKey, type CartItem } from "@/features/cart/cart";
import QtyStepper from "@/components/QtyStepper/QtyStepper";
import styles from "./CartView.module.scss";

/** Riga del carrello: immagine variante, info, stepper, totale, rimuovi. */
export default function CartLineItem({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = useCart();

  const product = getProductById(item.productId);
  // Doppia cintura: le righe stantie sono già filtrate all'idratazione.
  if (!product) return null;

  const key = lineKey(item);
  const colorOption = product.colors?.find((c) => c.name === item.color);
  const image = colorOption?.image ?? product.image;
  const meta = [item.size !== null && `Taglia ${item.size}`, item.color].filter(
    Boolean,
  );

  return (
    <li className={styles.line}>
      <Link
        href={`/prodotti/${product.id}`}
        className={styles.media}
        aria-label={product.name}
      >
        <Image src={image} alt={product.name} fill sizes="96px" />
      </Link>

      <div className={styles.details}>
        <Link href={`/prodotti/${product.id}`} className={styles.name}>
          {product.name}
        </Link>
        {meta.length > 0 && <p className={styles.meta}>{meta.join(" · ")}</p>}
        <p className={styles.unitPrice}>
          &euro;{formatEuros(product.priceCents)}
        </p>
        <button
          type="button"
          className={styles.remove}
          aria-label={`Rimuovi ${product.name} dal carrello`}
          onClick={() => removeItem(key)}
        >
          Rimuovi
        </button>
      </div>

      <div className={styles.controls}>
        <QtyStepper
          size="sm"
          value={item.qty}
          onChange={(qty) => updateQty(key, qty)}
          label={`Quantità di ${product.name}`}
        />
        <p className={styles.lineTotal}>
          &euro;{formatEuros(product.priceCents * item.qty)}
        </p>
      </div>
    </li>
  );
}
