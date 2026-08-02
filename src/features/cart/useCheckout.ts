"use client";

import { useCallback, useState } from "react";
import type { CartItem } from "./cart";

/** Ciò che il client invia al checkout: id + varianti + quantità, mai un prezzo. */
export type CheckoutLine = Pick<
  CartItem,
  "productId" | "size" | "color" | "qty"
>;

const GENERIC_ERROR = "Impossibile avviare il pagamento. Riprova.";

/** Chiede al server una sessione Stripe e ne restituisce l'URL di redirect. */
async function createCheckoutSession(items: CheckoutLine[]): Promise<string> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  let data: { url?: string; error?: string } = {};
  try {
    data = (await response.json()) as typeof data;
  } catch {
    // Risposta senza JSON: si ricade sul messaggio generico.
  }

  if (!response.ok || !data.url) {
    throw new Error(data.error ?? GENERIC_ERROR);
  }
  return data.url;
}

interface UseCheckout {
  /** Avvia il pagamento per queste righe e reindirizza a Stripe. */
  start: (items: CheckoutLine[]) => Promise<void>;
  /** true dall'invio fino al redirect (o all'errore). */
  pending: boolean;
  /** Messaggio d'errore da mostrare, oppure null. */
  error: string | null;
}

/**
 * Stato locale del checkout, condiviso dai tre trigger (carrello, modale,
 * "Compra ora"). In caso di successo si esce dalla pagina: `pending` resta
 * true fino all'unload, così il bottone non "torna attivo" a metà redirect.
 */
export function useCheckout(): UseCheckout {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async (items: CheckoutLine[]) => {
    if (pendingGuard(items)) return;
    setPending(true);
    setError(null);
    try {
      const url = await createCheckoutSession(items);
      window.location.assign(url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : GENERIC_ERROR);
      setPending(false);
    }
  }, []);

  return { start, pending, error };
}

/** Niente da pagare: carrello vuoto → nessuna chiamata. */
function pendingGuard(items: CheckoutLine[]): boolean {
  return items.length === 0;
}
