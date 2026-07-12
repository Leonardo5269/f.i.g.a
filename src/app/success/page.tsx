import Esito from "@/ui/Esito/Esito";

interface SuccessPageProps {
  // In Next.js 15+ searchParams è una Promise (rendering dinamico).
  searchParams: Promise<{ session_id?: string | string[] }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId =
    typeof params.session_id === "string" ? params.session_id : null;

  return (
    <main>
      <Esito
        stamp="Pratica approvata"
        title="Pagamento riuscito."
        reference={
          sessionId !== null
            ? { label: "Riferimento del pagamento", value: sessionId }
            : undefined
        }
        actionHref="/"
        actionLabel="Torna al catalogo"
        chiosa="La sede centrale ha timbrato senza nemmeno leggere."
      >
        Il tuo pezzo è ufficialmente ordinato. Stripe ti ha inviato
        l&rsquo;email di conferma; la spedizione parte entro 5 giorni
        lavorativi.
      </Esito>
    </main>
  );
}
