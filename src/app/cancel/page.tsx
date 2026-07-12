import Esito from "@/ui/Esito/Esito";

export default function CancelPage() {
  return (
    <main>
      <Esito
        stamp="Pratica annullata"
        cancelled
        title="Nessun addebito."
        actionHref="/"
        actionLabel="Torna al catalogo"
      >
        Hai interrotto il pagamento e la tua carta non è stata toccata. Il
        catalogo resta qui: è impermeabile anche ai ripensamenti.
      </Esito>
    </main>
  );
}
