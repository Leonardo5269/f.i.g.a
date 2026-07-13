// ============================================================
// Dominio carrello — logica pura, zero React.
// Il client persiste SOLO id/varianti/quantità: i prezzi si
// risolvono sempre dal catalogo (src/lib/products.ts), mai
// salvati né inviati dal client.
//
// I prodotti non hanno SKU per variante: l'identità di una riga
// è la tripla (productId, size, color) — vedi lineKey().
// ============================================================

import { getProductById } from "@/lib/products";

/** Limite standard e-commerce per singola riga. */
export const MAX_QTY_PER_LINE = 10;

export const CART_STORAGE_KEY = "figa:cart:v1";
const CART_SCHEMA_VERSION = 1;

export interface CartItem {
  productId: string;
  /** null quando il prodotto non ha taglie (sciarpa, cappello, sticker). */
  size: string | null;
  /** Nome del ColorOption; null quando il prodotto non ha colori (sticker). */
  color: string | null;
  /** 1..MAX_QTY_PER_LINE */
  qty: number;
}

export type CartLineInput = Omit<CartItem, "qty"> & { qty: number };

/** Identità composita della riga (niente SKU per variante nel catalogo). */
export function lineKey(
  item: Pick<CartItem, "productId" | "size" | "color">,
): string {
  return `${item.productId}::${item.size ?? ""}::${item.color ?? ""}`;
}

function clampQty(qty: number): number {
  return Math.min(Math.max(Math.trunc(qty), 1), MAX_QTY_PER_LINE);
}

/** Aggiunge una riga; stessa variante già presente → somma le quantità. */
export function addLine(items: CartItem[], input: CartLineInput): CartItem[] {
  const key = lineKey(input);
  const existing = items.find((item) => lineKey(item) === key);

  if (existing) {
    return items.map((item) =>
      lineKey(item) === key
        ? { ...item, qty: clampQty(item.qty + input.qty) }
        : item,
    );
  }
  return [...items, { ...input, qty: clampQty(input.qty) }];
}

export function updateLineQty(
  items: CartItem[],
  key: string,
  qty: number,
): CartItem[] {
  return items.map((item) =>
    lineKey(item) === key ? { ...item, qty: clampQty(qty) } : item,
  );
}

export function removeLine(items: CartItem[], key: string): CartItem[] {
  return items.filter((item) => lineKey(item) !== key);
}

/** Numero del badge in navbar: somma delle quantità. */
export function countItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.qty, 0);
}

/** Subtotale in centesimi; le righe con id non più a catalogo non contano. */
export function subtotalCents(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const product = getProductById(item.productId);
    return product ? total + product.priceCents * item.qty : total;
  }, 0);
}

/**
 * Idratazione da localStorage: qualsiasi dato corrotto, di versione
 * diversa o non più valido rispetto al catalogo viene scartato in
 * silenzio — mai un crash per uno storage sporco.
 */
export function sanitizeStoredCart(raw: unknown): CartItem[] {
  if (
    typeof raw !== "object" ||
    raw === null ||
    (raw as { version?: unknown }).version !== CART_SCHEMA_VERSION ||
    !Array.isArray((raw as { items?: unknown }).items)
  ) {
    return [];
  }

  const clean: CartItem[] = [];
  for (const entry of (raw as { items: unknown[] }).items) {
    if (typeof entry !== "object" || entry === null) continue;
    const { productId, size, color, qty } = entry as Record<string, unknown>;

    if (typeof productId !== "string") continue;
    const product = getProductById(productId);
    if (!product) continue;

    const sizes = product.sizes ?? [];
    const validSize =
      sizes.length > 0
        ? typeof size === "string" && sizes.includes(size)
        : size === null;
    if (!validSize) continue;

    const colorNames = (product.colors ?? []).map((option) => option.name);
    const validColor =
      colorNames.length > 0
        ? typeof color === "string" && colorNames.includes(color)
        : color === null;
    if (!validColor) continue;

    if (typeof qty !== "number" || !Number.isFinite(qty) || qty < 1) continue;

    clean.push({
      productId,
      size: sizes.length > 0 ? (size as string) : null,
      color: colorNames.length > 0 ? (color as string) : null,
      qty: clampQty(qty),
    });
  }

  // Dedup per lineKey (merge delle quantità).
  return clean.reduce<CartItem[]>((deduped, item) => addLine(deduped, item), []);
}

/** Shape serializzata su localStorage. */
export function serializeCart(items: CartItem[]): string {
  return JSON.stringify({ version: CART_SCHEMA_VERSION, items });
}
