import Link from "next/link";
import Image from "next/image";

export default function CancelPage() {
  return (
    <>
      <header className="testata">
        <Image src="/logo.svg" alt="F.I.G.A." width={52} height={52} className="testata-logo" />
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
