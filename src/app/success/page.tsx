import Link from "next/link";

interface SuccessPageProps {
  // In Next.js 15+ searchParams è una Promise (rendering dinamico).
  searchParams: Promise<{ session_id?: string | string[] }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId =
    typeof params.session_id === "string" ? params.session_id : null;

  return (
    <>
      <header className="testata">
        <p>Facciamo Italia Grande Ancora</p>
        <p className="testata-atto">Ufficio conferme</p>
      </header>

      <main className="esito">
        <div className="esito-pannello">
          <p className="timbro">Pratica approvata</p>
          <h1 className="esito-titolo">Pagamento riuscito.</h1>
          <p className="esito-testo">
            Il tuo pezzo è ufficialmente ordinato. Stripe ti ha inviato
            l&rsquo;email di conferma; la spedizione parte entro 5 giorni
            lavorativi.
          </p>

          {sessionId !== null && (
            <p className="esito-rif">
              <strong>Riferimento del pagamento</strong>
              {sessionId}
            </p>
          )}

          <Link href="/" className="esito-azione">
            Torna al catalogo
          </Link>

          <p className="esito-chiosa">
            La sede centrale ha timbrato senza nemmeno leggere.
          </p>
        </div>
      </main>
    </>
  );
}
