import type { Metadata } from "next";
import Section from "@/ui/Section/Section";
import { contacts } from "@/features/contacts";
import { cn } from "@/utils/ui";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Termini e condizioni · F.I.G.A.",
  description:
    "Termini e condizioni di vendita di F.I.G.A. — prodotti, prezzi, ordini, pagamenti con Stripe, spedizione in Italia, diritto di recesso e garanzia legale.",
};

// Dati legali del venditore — da completare con i valori reali prima della
// pubblicazione (oggi placeholder, come in src/features/contacts.ts).
const VENDITORE = {
  ragioneSociale: contacts.company, // TODO: ragione sociale reale
  email: contacts.email.content, // TODO: casella di contatto reale
};

// Aggiornare a ogni revisione sostanziale delle condizioni.
const ULTIMO_AGGIORNAMENTO = "3 agosto 2026";

// Percorso legale (registro serio, WCAG AA): titolazione manifesto come le
// altre pagine (titolo + divisore tricolore), corpo in Archivo per la
// leggibilità di un testo lungo (i titoli di sezione NON sono manifesto).
export default function TermsPage() {
  return (
    <main>
      <Section aria-labelledby="terms-titolo">
        <h1 id="terms-titolo" className="text-h2 center-text">
          Termini
        </h1>
        <div className={cn("tricolore", styles.divisore)} aria-hidden="true" />

        <article className={styles.doc}>
          <p className={cn("large", styles.lead)}>
            Sul modo di fare la satira siamo scatenati, sulle regole della
            vendita siamo seri. Questi termini e condizioni disciplinano la
            vendita online dei prodotti F.I.G.A. e il contratto che concludi
            quando ordini sul sito: leggili prima di acquistare, perché fanno
            parte a tutti gli effetti dell&rsquo;accordo tra te e il venditore.
          </p>

          <p className={styles.meta}>
            Ultimo aggiornamento: {ULTIMO_AGGIORNAMENTO}
          </p>

          <section className={styles.sezione} aria-labelledby="oggetto">
            <h2 id="oggetto">1. Oggetto e venditore</h2>
            <p>
              Le presenti condizioni generali regolano la vendita a distanza
              dei prodotti di merchandising a marchio F.I.G.A. (magliette,
              felpe, sciarpe e altri articoli) offerti su questo sito. Il
              venditore è {VENDITORE.ragioneSociale}. Per qualsiasi questione
              relativa a un ordine puoi scrivere a{" "}
              <a
                href={`mailto:${VENDITORE.email}`}
                className="simple-link-3"
              >
                {VENDITORE.email}
              </a>
              . Concludendo un ordine dichiari di aver letto e accettato queste
              condizioni.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="prodotti">
            <h2 id="prodotti">2. Prodotti e disponibilità</h2>
            <p>
              I prodotti in vendita sono capi e accessori di merchandising:
              t-shirt, felpe, sciarpe e articoli affini. Ogni prodotto è
              descritto nella relativa scheda con nome, materiali e, dove
              previsto, le varianti di colore e taglia disponibili.
            </p>
            <p>
              Alcuni articoli possono essere segnalati come &ldquo;coming
              soon&rdquo;: sono presenti nel catalogo a scopo informativo ma non
              sono ancora acquistabili e non possono essere aggiunti a un ordine
              valido. La disponibilità dei prodotti non è garantita e può
              variare nel tempo; le immagini, i colori e le taglie hanno valore
              indicativo e possono differire leggermente dal prodotto reale a
              causa delle impostazioni del tuo schermo o delle tolleranze di
              produzione.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="prezzi">
            <h2 id="prezzi">3. Prezzi</h2>
            <p>
              Tutti i prezzi sono espressi in euro e si intendono comprensivi
              dell&rsquo;IVA applicabile. Il prezzo valido per il tuo acquisto è
              quello indicato nel catalogo del sito al momento dell&rsquo;invio
              dell&rsquo;ordine: al momento del pagamento l&rsquo;importo viene
              sempre determinato e verificato lato server sulla base del listino
              del sito, e non su un valore trasmesso dal tuo dispositivo.
            </p>
            <p>
              Eventuali spese di spedizione, quando previste, sono indicate in
              modo chiaro prima della conferma del pagamento e si aggiungono al
              prezzo dei prodotti. Nessun costo ulteriore ti viene addebitato
              senza che tu lo abbia visualizzato e accettato.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="ordine">
            <h2 id="ordine">4. Ordine e conclusione del contratto</h2>
            <p>
              Aggiungi i prodotti al carrello, scegli le eventuali varianti di
              colore e taglia e procedi al pagamento tramite la pagina di
              checkout sicura gestita da Stripe. L&rsquo;invio
              dell&rsquo;ordine con il buon esito del pagamento costituisce una
              proposta d&rsquo;acquisto vincolante.
            </p>
            <p>
              Il contratto di vendita si intende concluso nel momento in cui
              l&rsquo;ordine è confermato a seguito del pagamento andato a buon
              fine. Ricevi da Stripe un&rsquo;email di conferma con il
              riepilogo dell&rsquo;acquisto e il riferimento del pagamento. Ci
              riserviamo di non dare seguito a ordini che risultino incompleti,
              relativi a prodotti non disponibili o &ldquo;coming soon&rdquo;,
              oppure fondati su dati manifestamente errati: in tali casi
              eventuali importi già addebitati vengono rimborsati.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="pagamenti">
            <h2 id="pagamenti">5. Pagamenti</h2>
            <p>
              I pagamenti sono gestiti da Stripe tramite carta di
              credito/debito, sulle sue pagine di pagamento sicure. I dati della
              tua carta (numero, scadenza, CVC) sono raccolti e trattati
              direttamente da Stripe: il sito F.I.G.A. non vede, non riceve e
              non conserva i dati della tua carta. Le transazioni avvengono su
              connessione cifrata (HTTPS) e su infrastruttura conforme allo
              standard PCI-DSS.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="spedizione">
            <h2 id="spedizione">6. Spedizione e consegna</h2>
            <p>
              Attualmente spediamo esclusivamente in Italia: al momento del
              pagamento è possibile inserire solo un indirizzo di spedizione
              italiano. I tempi indicati sono orientativi: salvo diversa
              indicazione, la spedizione parte entro 5 giorni lavorativi dalla
              conferma dell&rsquo;ordine, a cui va aggiunto il tempo di consegna
              del corriere.
            </p>
            <p>
              I termini di consegna non sono essenziali e possono subire
              variazioni per cause non imputabili al venditore. Il rischio di
              perdita o danneggiamento dei prodotti passa a te nel momento in
              cui tu, o un terzo da te designato diverso dal vettore, entri
              materialmente in possesso dei beni.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="recesso">
            <h2 id="recesso">7. Diritto di recesso</h2>
            <p>
              Se acquisti come consumatore hai diritto di recedere dal contratto
              senza fornire alcuna motivazione entro 14 giorni, ai sensi degli
              artt. 52 e seguenti del Codice del Consumo (D.lgs. 206/2005). Il
              termine decorre dal giorno in cui tu, o un terzo da te designato
              diverso dal vettore, acquisisci il possesso fisico dei prodotti.
            </p>
            <p>
              Per esercitare il recesso è sufficiente comunicarci la tua
              decisione con una dichiarazione esplicita, scrivendo a{" "}
              <a
                href={`mailto:${VENDITORE.email}`}
                className="simple-link-3"
              >
                {VENDITORE.email}
              </a>
              . I prodotti vanno restituiti integri, non utilizzati e con le
              eventuali etichette originali, entro 14 giorni dalla comunicazione
              del recesso. Il costo diretto della restituzione è a tuo carico,
              salvo diversa indicazione.
            </p>
            <p>
              Dopo aver ricevuto e verificato il reso, ti rimborsiamo gli importi
              pagati per i prodotti restituiti senza indebito ritardo e comunque
              entro 14 giorni dalla comunicazione del recesso, con lo stesso
              mezzo di pagamento usato per l&rsquo;acquisto, salvo tu abbia
              espressamente concordato diversamente.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="garanzia">
            <h2 id="garanzia">8. Garanzia legale di conformità</h2>
            <p>
              Sui prodotti si applica la garanzia legale di conformità prevista
              dal Codice del Consumo: se acquisti come consumatore hai diritto,
              per 24 mesi dalla consegna, al ripristino della conformità del
              bene difettoso o non conforme (riparazione o sostituzione) e, alle
              condizioni di legge, alla riduzione del prezzo o alla risoluzione
              del contratto. Per far valere la garanzia contattaci ai
              riferimenti indicati in questa pagina.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="reclami">
            <h2 id="reclami">9. Reclami e assistenza</h2>
            <p>
              Per assistenza, informazioni su un ordine o per inoltrare un
              reclamo puoi scriverci a{" "}
              <a
                href={`mailto:${VENDITORE.email}`}
                className="simple-link-3"
              >
                {VENDITORE.email}
              </a>
              . Trattiamo ogni segnalazione con serietà e ti rispondiamo nel
              minor tempo possibile.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="proprieta">
            <h2 id="proprieta">10. Proprietà intellettuale</h2>
            <p>
              Il nome F.I.G.A., i marchi, i loghi, le grafiche, gli slogan, i
              testi e ogni altro contenuto del sito sono protetti dalle norme in
              materia di proprietà intellettuale e industriale e appartengono al
              venditore o ai rispettivi titolari. È vietata qualsiasi
              riproduzione, distribuzione, modifica o utilizzo di tali contenuti,
              in tutto o in parte, senza previa autorizzazione scritta.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="legge">
            <h2 id="legge">11. Legge applicabile e foro competente</h2>
            <p>
              Il contratto di vendita è regolato dalla legge italiana. Per le
              controversie con i consumatori è competente, in via esclusiva, il
              foro del luogo di residenza o di domicilio del consumatore, se
              situato nel territorio dello Stato.
            </p>
            <p>
              In quanto consumatore puoi inoltre ricorrere alla piattaforma
              europea di risoluzione delle controversie online (ODR), disponibile
              all&rsquo;indirizzo{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="simple-link-3"
              >
                ec.europa.eu/consumers/odr
              </a>
              .
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="modifiche">
            <h2 id="modifiche">12. Modifiche ai termini</h2>
            <p>
              Possiamo aggiornare queste condizioni per adeguarle a modifiche
              normative o del servizio. La versione in vigore è sempre quella
              pubblicata su questa pagina, con la data di ultimo aggiornamento
              indicata in alto; a ciascun ordine si applicano le condizioni
              vigenti al momento dell&rsquo;invio dell&rsquo;ordine.
            </p>
          </section>
        </article>
      </Section>
    </main>
  );
}
