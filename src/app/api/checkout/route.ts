import Stripe from "stripe";
import { getProductById } from "@/lib/products";
import { validateCartItems, type CartItem } from "@/features/cart/cart";

// Runtime Node.js: l'SDK Stripe richiede API Node complete (non Edge).
export const runtime = "nodejs";

const PRODUCT_CURRENCY = "eur";

// Limite Stripe per singolo valore di metadata (caratteri). Il carrello
// viene serializzato e, se supera la soglia, spezzato su più chiavi
// (`cart_0`, `cart_1`, …) che il webhook ricompone.
const METADATA_VALUE_LIMIT = 450;

// Singleton lazy: il client viene istanziato alla prima richiesta,
// non al momento del build (dove le env di runtime potrebbero mancare).
let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Variabile d'ambiente STRIPE_SECRET_KEY non configurata.");
  }
  stripeClient ??= new Stripe(secretKey);
  return stripeClient;
}

interface CheckoutRequestBody {
  /** Righe del carrello: id + varianti + quantità. Mai un prezzo. */
  items?: unknown;
  /** Retro-compatibilità: acquisto diretto di un singolo prodotto. */
  productId?: unknown;
}

/** Normalizza il body in una lista grezza di righe, poi la valida. */
function readRawItems(body: CheckoutRequestBody): unknown[] {
  if (Array.isArray(body.items)) return body.items;
  if (typeof body.productId === "string") {
    return [{ productId: body.productId, size: null, color: null, qty: 1 }];
  }
  return [];
}

/**
 * Serializza il carrello (con varianti) per il fulfillment. I valori di
 * metadata Stripe sono limitati a 500 caratteri: se il payload è più lungo
 * viene spezzato su chiavi numerate, ricomposte dal webhook.
 */
function cartMetadata(items: CartItem[]): Record<string, string> {
  const payload = JSON.stringify(
    items.map((item) => ({
      p: item.productId,
      s: item.size,
      c: item.color,
      q: item.qty,
    })),
  );

  if (payload.length <= METADATA_VALUE_LIMIT) return { cart: payload };

  const chunks: Record<string, string> = {};
  for (let i = 0, part = 0; i < payload.length; i += METADATA_VALUE_LIMIT) {
    chunks[`cart_${part++}`] = payload.slice(i, i + METADATA_VALUE_LIMIT);
  }
  return chunks;
}

export async function POST(request: Request): Promise<Response> {
  try {
    let body: CheckoutRequestBody;
    try {
      body = (await request.json()) as CheckoutRequestBody;
    } catch {
      return Response.json(
        { error: "Corpo della richiesta non valido." },
        { status: 400 },
      );
    }

    // Validazione contro il catalogo LATO SERVER: il client manda solo
    // id/varianti/quantità, mai un importo. Le righe non riconosciute
    // (id inesistente, taglia/colore non validi) vengono scartate; i
    // prodotti "coming soon" non sono acquistabili.
    const items = validateCartItems(readRawItems(body)).filter((item) => {
      const product = getProductById(item.productId);
      return product !== undefined && !product.comingSoon;
    });

    if (items.length === 0) {
      return Response.json(
        { error: "Nessun articolo acquistabile nel carrello." },
        { status: 400 },
      );
    }

    // Il prezzo è per prodotto, non per variante: le righe con la stessa
    // variante sono già fuse da validateCartItems; qui accorpiamo anche le
    // varianti diverse dello stesso prodotto in un'unica riga Stripe
    // (Stripe rifiuta più line item sullo stesso prezzo). Il dettaglio per
    // variante resta nei metadata, per il fulfillment.
    const quantities = new Map<string, number>();
    for (const item of items) {
      quantities.set(
        item.productId,
        (quantities.get(item.productId) ?? 0) + item.qty,
      );
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const [productId, quantity] of quantities) {
      const product = getProductById(productId);
      if (!product) continue;

      // Importo sempre dal catalogo (unica fonte di verità del prezzo).
      // Il prodotto Stripe configurato dà nome e ricevuta; senza id
      // configurato si ripiega su un prodotto inline.
      lineItems.push({
        price_data: {
          currency: PRODUCT_CURRENCY,
          unit_amount: product.priceCents,
          ...(product.stripeProductId
            ? { product: product.stripeProductId }
            : { product_data: { name: `${product.name} · F.I.G.A.` } }),
        },
        quantity,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Variabile d'ambiente NEXT_PUBLIC_BASE_URL non configurata.",
      );
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      // Il webhook legge da qui le righe (con varianti) da evadere: i nomi
      // dei line item Stripe servono solo alla ricevuta del cliente.
      metadata: cartMetadata(items),
      // Prodotto fisico: Stripe raccoglie l'indirizzo di spedizione.
      // Il webhook lo troverà in session.collected_information.
      shipping_address_collection: {
        allowed_countries: ["IT"],
      },
      // {CHECKOUT_SESSION_ID} è un template literal risolto da Stripe
      // al momento del redirect — NON va interpolato lato server.
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    if (!session.url) {
      throw new Error("Stripe non ha restituito un URL di checkout.");
    }

    return Response.json({ url: session.url }, { status: 200 });
  } catch (error) {
    // Log completo lato server; al client arriva solo un messaggio generico
    // per non esporre dettagli interni (chiavi, configurazione, stack).
    console.error("[api/checkout] Creazione sessione fallita:", error);
    return Response.json(
      { error: "Impossibile creare la sessione di pagamento." },
      { status: 500 },
    );
  }
}
