// Runtime Node.js: coerente con le altre route del progetto (nessuna
// dipendenza da API Edge) e per tenere il segreto RESEND_API_KEY lato server.
export const runtime = "nodejs";

// Limiti di validazione — allineati ai campi del form Contatti.
const NOME_MAX = 100;
const MESSAGGIO_MAX = 5000;

// Regex email volutamente semplice: filtra gli errori evidenti senza
// pretendere di validare ogni caso limite dell'RFC (lo farà il tentativo
// di risposta reale).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Messaggio generico verso il client: non espone mai dettagli interni
// (configurazione mancante, risposta del provider, stack).
const ERRORE_GENERICO =
  "Impossibile inviare il messaggio in questo momento. Riprova più tardi.";

interface ContactRequestBody {
  nome?: unknown;
  email?: unknown;
  messaggio?: unknown;
}

export async function POST(request: Request): Promise<Response> {
  try {
    let body: ContactRequestBody;
    try {
      body = (await request.json()) as ContactRequestBody;
    } catch {
      return Response.json(
        { error: "Corpo della richiesta non valido." },
        { status: 400 },
      );
    }

    const { nome, email, messaggio } = body;

    // Validazione LATO SERVER: i tre campi devono essere stringhe presenti,
    // entro i limiti, con un'email formalmente valida.
    if (
      typeof nome !== "string" ||
      typeof email !== "string" ||
      typeof messaggio !== "string"
    ) {
      return Response.json(
        { error: "Compila nome, email e messaggio." },
        { status: 400 },
      );
    }

    const nomePulito = nome.trim();
    const emailPulita = email.trim();
    const messaggioPulito = messaggio.trim();

    if (nomePulito.length === 0 || nomePulito.length > NOME_MAX) {
      return Response.json(
        { error: "Inserisci un nome (massimo 100 caratteri)." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(emailPulita)) {
      return Response.json(
        { error: "Inserisci un indirizzo email valido." },
        { status: 400 },
      );
    }

    if (
      messaggioPulito.length === 0 ||
      messaggioPulito.length > MESSAGGIO_MAX
    ) {
      return Response.json(
        { error: "Inserisci un messaggio (massimo 5000 caratteri)." },
        { status: 400 },
      );
    }

    // Segreto solo lato server. Se manca, non riveliamo il motivo al client:
    // logghiamo un messaggio chiaro e restituiamo un errore generico.
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error(
        "[api/contact] Invio impossibile: variabile d'ambiente RESEND_API_KEY non configurata.",
      );
      return Response.json({ error: ERRORE_GENERICO }, { status: 500 });
    }

    const to = process.env.CONTACT_TO ?? "leo@studiocolore.it";
    const from = process.env.CONTACT_FROM ?? "F.I.G.A. <onboarding@resend.dev>";

    // Corpo email in testo semplice: chi ha scritto, la sua email e il
    // messaggio. `reply_to` punta al mittente per rispondere con un clic.
    const testo = [
      `Nuovo messaggio dal form Contatti di F.I.G.A.`,
      ``,
      `Nome: ${nomePulito}`,
      `Email: ${emailPulita}`,
      ``,
      `Messaggio:`,
      messaggioPulito,
    ].join("\n");

    // Invio via API HTTP di Resend con fetch (nessuna dipendenza npm nuova).
    const risposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: emailPulita,
        subject: `Nuovo messaggio da ${nomePulito} · F.I.G.A.`,
        text: testo,
      }),
    });

    if (!risposta.ok) {
      // Dettaglio del provider solo nei log lato server; al client va il
      // messaggio generico.
      const dettaglio = await risposta.text().catch(() => "");
      console.error(
        `[api/contact] Resend ha risposto ${risposta.status}: ${dettaglio}`,
      );
      return Response.json({ error: ERRORE_GENERICO }, { status: 502 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    // Log completo lato server; al client solo un messaggio generico, per non
    // esporre dettagli interni (chiavi, configurazione, stack).
    console.error("[api/contact] Invio messaggio fallito:", error);
    return Response.json({ error: ERRORE_GENERICO }, { status: 500 });
  }
}
