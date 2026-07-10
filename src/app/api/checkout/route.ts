import Stripe from "stripe";
import { getProductById } from "@/lib/products";

// Runtime Node.js: l'SDK Stripe richiede API Node complete (non Edge).
export const runtime = "nodejs";

const PRODUCT_CURRENCY = "eur";

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
  productId?: unknown;
}

export async function POST(request: Request): Promise<Response> {
  try {
    let body: CheckoutRequestBody;
    try {
      body = (await request.json()) as CheckoutRequestBody;
    } catch {
      return Response.json(
        { error: "Corpo della richiesta non valido." },
        { status: 400 }
      );
    }

    if (typeof body.productId !== "string") {
      return Response.json(
        { error: "Prodotto non specificato." },
        { status: 400 }
      );
    }

    // Il prezzo viene sempre letto dal catalogo server-side: il client
    // manda solo un id, mai un importo. Questo chiude alla radice
    // qualunque tentativo di manomettere il prezzo dal browser.
    const product = getProductById(body.productId);
    if (!product) {
      return Response.json(
        { error: "Prodotto non riconosciuto." },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Variabile d'ambiente NEXT_PUBLIC_BASE_URL non configurata."
      );
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: PRODUCT_CURRENCY,
            product_data: {
              name: `${product.name} · f.i.g.a.`,
            },
            unit_amount: product.priceCents,
          },
          quantity: 1,
        },
      ],
      // Il webhook legge productId da qui per sapere quale articolo
      // evadere (il name di Stripe è solo per la ricevuta del cliente).
      metadata: {
        productId: product.id,
      },
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
      { status: 500 }
    );
  }
}
