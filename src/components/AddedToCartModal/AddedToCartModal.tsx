"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { getProductById, formatEuros } from "@/lib/products";
import { useCart } from "@/features/cart/CartContext";
import { lineKey, type CartItem } from "@/features/cart/cart";
import { cartRoute } from "@/features/routes";
import Button from "@/ui/Button/Button";
import styles from "./AddedToCartModal.module.scss";

interface AddedToCartModalProps {
  item: CartItem;
  onClose: () => void;
}

/**
 * Conferma "Aggiunto al carrello": popover ancorato sotto l'icona
 * carrello su desktop, bottom sheet su mobile (fork solo nello SCSS).
 * Percorso transazionale → serio, alto contrasto, niente ironia.
 */
export default function AddedToCartModal({
  item,
  onClose,
}: AddedToCartModalProps) {
  const { count } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const product = getProductById(item.productId);

  // Focus sulla X all'apertura, ripristino al trigger alla chiusura.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus();
  }, []);

  // Esc e click-outside chiudono; scroll-lock del body (rilevante quando
  // la modale è un bottom sheet con scrim, su mobile).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onMouseDown = (event: MouseEvent) => {
      if (!dialogRef.current?.contains(event.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    // Scroll-lock solo quando la modale è un bottom sheet a tutta
    // larghezza (breakpoint "mobile" di _mixins.scss).
    const isSheet = window.matchMedia("(max-width: 521px)").matches;
    if (isSheet) document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
      document.body.classList.remove("no-scroll");
    };
  }, [onClose]);

  // Riga con prodotto sparito dal catalogo: niente da confermare.
  if (!product) return null;

  const colorOption = product.colors?.find((c) => c.name === item.color);
  const image = colorOption?.image ?? product.image;
  const meta = [
    item.size !== null && `Taglia ${item.size}`,
    item.color,
  ].filter(Boolean);

  return (
    <>
      <div className={styles.backdrop} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Aggiunto al carrello"
        className={styles.modal}
        // Aggiunta ripetuta a modale aperta: key nuova → focus/contenuto freschi.
        key={lineKey(item)}
      >
        <div className={styles.header}>
          <p className={styles.title}>
            <FaCheckCircle className={styles.check} aria-hidden="true" />
            Aggiunto al carrello
          </p>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="Chiudi"
            onClick={onClose}
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.media}>
            <Image src={image} alt={product.name} fill sizes="80px" />
          </div>
          <div className={styles.details}>
            <p className={styles.name}>{product.name}</p>
            {meta.length > 0 && (
              <p className={styles.meta}>{meta.join(" · ")}</p>
            )}
            <p className={styles.price}>
              &euro;{formatEuros(product.priceCents)}
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="outline" block href={cartRoute.path} onClick={onClose}>
            Visualizza carrello ({count})
          </Button>
          {/* TODO: flusso Stripe multi-item — deferito, per ora inattivo. */}
          <Button variant="filled" block disabled>
            Pagamento
          </Button>
        </div>
      </div>
    </>
  );
}
