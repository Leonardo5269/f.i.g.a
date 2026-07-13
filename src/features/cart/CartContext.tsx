"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CART_STORAGE_KEY,
  addLine,
  countItems,
  removeLine,
  sanitizeStoredCart,
  serializeCart,
  subtotalCents,
  updateLineQty,
  type CartItem,
  type CartLineInput,
} from "./cart";

/**
 * Stato globale del carrello, persistito su localStorage.
 *
 * Anti hydration-mismatch: server e primo paint client renderizzano
 * sempre il carrello vuoto; lo storage si legge in un effect al mount
 * (`hydrated` diventa true solo dopo). Badge e viste derivate devono
 * renderizzare contenuto solo quando `hydrated` è true.
 */
interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  count: number;
  subtotal: number;
  addItem: (input: CartLineInput) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  /**
   * Ultimo articolo aggiunto: pilota la modale di conferma in Navbar
   * (il trigger vive in ProductDetail, la modale è ancorata all'icona
   * carrello — per questo lo stato sta qui e non nei componenti).
   */
  lastAdded: { item: CartItem; addedQty: number } | null;
  dismissLastAdded: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartContextValue["lastAdded"]>(
    null,
  );

  // Idratazione dallo storage — dopo il primo paint, mai in SSR.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) setItems(sanitizeStoredCart(JSON.parse(raw)));
    } catch {
      // Storage corrotto o inaccessibile: si riparte da carrello vuoto.
    }
    setHydrated(true);
  }, []);

  // Persistenza — guardata da `hydrated` per non sovrascrivere lo
  // storage con lo stato vuoto del primo render.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, serializeCart(items));
    } catch {
      // Quota piena / storage negato: il carrello resta in memoria.
    }
  }, [items, hydrated]);

  // Sync tra tab: un'altra tab scrive → questa si riallinea.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== CART_STORAGE_KEY) return;
      try {
        setItems(
          event.newValue ? sanitizeStoredCart(JSON.parse(event.newValue)) : [],
        );
      } catch {
        setItems([]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((input: CartLineInput) => {
    setItems((prev) => addLine(prev, input));
    setLastAdded({
      item: { ...input },
      addedQty: input.qty,
    });
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) => updateLineQty(prev, key, qty));
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => removeLine(prev, key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const dismissLastAdded = useCallback(() => setLastAdded(null), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hydrated,
      count: countItems(items),
      subtotal: subtotalCents(items),
      addItem,
      updateQty,
      removeItem,
      clearCart,
      lastAdded,
      dismissLastAdded,
    }),
    [
      items,
      hydrated,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      lastAdded,
      dismissLastAdded,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart va usato dentro <CartProvider>");
  }
  return context;
}
