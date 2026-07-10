import Link from "next/link";

export default function CancelPage() {
  return (
    <>
      <header className="testata">
        <p>Facciamo Italia Grande Ancora</p>
        <p className="testata-atto">Ufficio ripensamenti</p>
      </header>

      <main className="esito">
        <div className="esito-pannello">
          <p className="timbro timbro-annullato">Pratica annullata</p>
          <h1 className="esito-titolo">Nessun addebito.</h1>
          <p className="esito-testo">
            Hai interrotto il pagamento e la tua carta non è stata toccata.
            Il catalogo resta qui: è impermeabile anche ai ripensamenti.
          </p>

          <Link href="/" className="esito-azione">
            Torna al catalogo
          </Link>
        </div>
      </main>
    </>
  );
}
