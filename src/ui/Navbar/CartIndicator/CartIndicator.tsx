"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { cartRoute } from "@/features/routes";
import { useCart } from "@/features/cart/CartContext";
import styles from "./CartIndicator.module.scss";

/**
 * Icona carrello in navbar con badge contatore (rosso corsa: cliccabile
 * e "urgenza", ammesso da DESIGN.md). A carrello vuoto — o prima
 * dell'idratazione dallo storage — il badge non esiste nel DOM.
 */
export default function CartIndicator({ onClick }: { onClick?: () => void }) {
  const { hydrated, count } = useCart();
  const showBadge = hydrated && count > 0;

  return (
    <Link
      href={cartRoute.path}
      onClick={onClick}
      className={styles.cart}
      aria-label={showBadge ? `Carrello, ${count} articoli` : "Carrello"}
    >
      <FaShoppingCart aria-hidden="true" />
      {showBadge && (
        <span className={styles.badge} aria-hidden="true">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
