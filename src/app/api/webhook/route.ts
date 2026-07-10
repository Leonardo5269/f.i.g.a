import Stripe from "stripe";

// Runtime Node.js obbligatorio: la verifica della firma Stripe opera
// sul payload grezzo (raw body), che qui estraiamo con request.text().
// Nell'App Router non esiste body-parsing automatico da disabilitare:
// il body resta intatto finché non lo consumiamo noi.
export const runtime = "nodejs";

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Variabile d'ambiente STRIPE_SECRET_KEY non configurata.");
  }
  stripeClient ??= new Stripe(secretKey);
  return stripeClient;
}

export async function POST(request: Request): Promise<Response> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[api/webhook] STRIPE_WEBHOOK_SECRET non configurata.");
    return Response.json(
      { error: "Webhook non configurato." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json(
      { error: "Header stripe-signature mancante." },
      { status: 400 }
    );
  }

  // Payload grezzo: qualsiasi parsing preventivo invaliderebbe la firma.
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );
  } catch (error) {
    // Firma non valida: richiesta contraffatta o secret errato.
    // 400 senza dettagli — non diamo indizi a un eventuale attaccante.
    console.error("[api/webhook] Verifica firma fallita:", error);
    return Response.json({ error: "Firma non valida." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      // Con metodi di pagamento asincroni (es. bonifico SEPA) la sessione
      // può completarsi con pagamento ancora in sospeso: si evade l'ordine
      // solo a incasso confermato.
      if (session.payment_status !== "paid") {
        console.warn(
          `[api/webhook] Sessione ${session.id} completata ma non pagata ` +
            `(payment_status=${session.payment_status}). Fulfillment rinviato.`
        );
        break;
      }

      // ========================================================
      // FULFILLMENT DELL'ORDINE — punto di aggancio del database.
      //
      // Qui va inserita la query di persistenza dell'ordine, ad es.:
      //
      //   INSERT INTO orders (
      //     stripe_session_id,     -- session.id (chiave di idempotenza:
      //                            --   vincolo UNIQUE, così le ritrasmissioni
      //                            --   dello stesso evento non duplicano ordini)
      //     stripe_payment_intent, -- session.payment_intent
      //     product_id,            -- session.metadata?.productId (quale
      //                            --   articolo del catalogo evadere)
      //     customer_email,        -- session.customer_details?.email
      //     shipping_address,      -- session.collected_information?.shipping_details
      //     amount_total_cents,    -- session.amount_total (centesimi, intero)
      //     currency,              -- session.currency
      //     payment_status,        -- session.payment_status ("paid")
      //     created_at             -- new Date(event.created * 1000)
      //   )
      //   ON CONFLICT (stripe_session_id) DO NOTHING;
      //
      // Seguono tipicamente: invio email di conferma / passaggio in
      // produzione dell'articolo (stampa/confezione) in base a
      // product_id. Ogni step deve essere idempotente perché Stripe
      // ritrasmette gli eventi finché non riceve un 200.
      // ========================================================
      console.log(
        `[api/webhook] Pagamento confermato — sessione: ${session.id}, ` +
          `prodotto: ${session.metadata?.productId ?? "n/d"}, ` +
          `email: ${session.customer_details?.email ?? "n/d"}, ` +
          `importo: ${session.amount_total ?? 0} ${session.currency ?? "n/d"}`
      );

      break;
    }

    default:
      // Eventi non gestiti: ACK comunque con 200, altrimenti Stripe
      // continuerebbe a ritrasmetterli inutilmente.
      break;
  }

  return Response.json({ received: true }, { status: 200 });
}
