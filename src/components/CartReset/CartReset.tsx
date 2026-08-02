"use client";

import { useEffect } from "react";
import { useCart } from "@/features/cart/CartContext";

/**
 * Svuota il carrello dopo un pagamento andato a buon fine. Montato solo
 * sulla pagina /success e attivo solo con un session_id valido: una visita
 * diretta a /success non azzera il carrello. Non renderizza nulla.
 */
export default function CartReset({ active }: { active: boolean }) {
  const { clearCart } = useCart();

  useEffect(() => {
    if (active) clearCart();
  }, [active, clearCart]);

  return null;
}
