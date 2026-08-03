import type { Metadata } from "next";
import Section from "@/ui/Section/Section";
import { contacts } from "@/features/contacts";
import { cn } from "@/utils/ui";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Privacy · F.I.G.A.",
  description:
    "Informativa sul trattamento dei dati personali di F.I.G.A. — quali dati raccogliamo, perché, con chi e quali diritti hai (Reg. UE 2016/679).",
};

// Dati legali del titolare — da completare con i valori reali prima della
// pubblicazione (oggi placeholder, come in src/features/contacts.ts).
const TITOLARE = {
  ragioneSociale: contacts.company, // TODO: ragione sociale reale
  piva: "[P.IVA da inserire]", // TODO
  sede: "[sede legale da inserire]", // TODO
  email: contacts.email.content, // TODO: casella di contatto reale
};

// Aggiornare a ogni revisione sostanziale dell'informativa.
const ULTIMO_AGGIORNAMENTO = "3 agosto 2026";

// Percorso legale (registro serio, WCAG AA): titolazione manifesto come le
// altre pagine (titolo + divisore tricolore), corpo in Archivo per la
// leggibilità di un testo lungo (i titoli di sezione NON sono manifesto).
export default function PrivacyPage() {
  return (
    <main>
      <Section aria-labelledby="privacy-titolo">
        <h1 id="privacy-titolo" className="text-h2 center-text">
          Privacy
        </h1>
        <div className={cn("tricolore", styles.divisore)} aria-hidden="true" />

        <article className={styles.doc}>
          <p className={cn("large", styles.lead)}>
            F.I.G.A. tratta i tuoi dati con la stessa serietà con cui prende in
            giro tutto il resto. Questa informativa spiega, senza giri di
            parole, quali dati raccogliamo quando visiti il sito o fai un
            acquisto, perché lo facciamo, con chi li condividiamo e quali
            diritti hai. È resa ai sensi degli articoli 13 e 14 del Regolamento
            (UE) 2016/679 (GDPR).
          </p>

          <p className={styles.meta}>
            Ultimo aggiornamento: {ULTIMO_AGGIORNAMENTO}
          </p>

          <section className={styles.sezione} aria-labelledby="titolare">
            <h2 id="titolare">1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento è {TITOLARE.ragioneSociale}, P.IVA{" "}
              {TITOLARE.piva}, con sede in {TITOLARE.sede}. Per qualsiasi
              questione relativa ai tuoi dati puoi scrivere a{" "}
              <a href={`mailto:${TITOLARE.email}`} className="simple-link-3">
                {TITOLARE.email}
              </a>
              .
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="dati">
            <h2 id="dati">2. Quali dati raccogliamo</h2>
            <ul>
              <li>
                <strong>Dati di ordine e spedizione:</strong> nome, cognome,
                indirizzo email e indirizzo di spedizione. Li inserisci nella
                pagina di pagamento sicura gestita da Stripe al momento
                dell&rsquo;acquisto.
              </li>
              <li>
                <strong>Dati di pagamento:</strong> i dati della tua carta
                (numero, scadenza, CVC) sono raccolti e trattati direttamente da
                Stripe sulle sue pagine. F.I.G.A. non vede, non riceve e non
                conserva i dati della tua carta.
              </li>
              <li>
                <strong>Dati del carrello:</strong> gli articoli che aggiungi
                restano salvati nella memoria locale del tuo browser
                (localStorage) e non vengono inviati ai nostri server finché non
                avvii il pagamento. In quel momento trasmettiamo solo
                l&rsquo;elenco dei prodotti e delle varianti scelte, mai un
                prezzo deciso dal tuo dispositivo.
              </li>
              <li>
                <strong>Dati tecnici e di navigazione:</strong> quando visiti il
                sito, l&rsquo;infrastruttura che lo ospita (Vercel) registra
                automaticamente nei log dati come l&rsquo;indirizzo IP, il tipo
                di browser e la data e ora della richiesta, necessari a erogare
                e proteggere il servizio.
              </li>
              <li>
                <strong>Dati di contatto:</strong> se ci scrivi via email,
                trattiamo il tuo indirizzo e il contenuto del messaggio per
                risponderti.
              </li>
            </ul>
            <p>
              Il sito non richiede la creazione di un account e non raccoglie
              categorie particolari di dati ai sensi dell&rsquo;art. 9 GDPR.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="finalita">
            <h2 id="finalita">3. Perché li trattiamo e su quale base</h2>
            <ul>
              <li>
                <strong>Evadere e spedire il tuo ordine,</strong> gestire resi e
                assistenza — base giuridica: esecuzione del contratto di cui sei
                parte (art. 6, par. 1, lett. b).
              </li>
              <li>
                <strong>Adempiere agli obblighi di legge,</strong> in
                particolare fiscali e contabili — base giuridica: obbligo legale
                (art. 6, par. 1, lett. c).
              </li>
              <li>
                <strong>Garantire la sicurezza del sito,</strong> prevenire
                abusi e frodi — base giuridica: nostro legittimo interesse (art.
                6, par. 1, lett. f).
              </li>
              <li>
                <strong>Rispondere alle tue richieste di contatto</strong> —
                base giuridica: nostro legittimo interesse a darti riscontro.
              </li>
              <li>
                <strong>Inviarti la newsletter,</strong> se e quando la
                attiveremo — base giuridica: il tuo consenso (art. 6, par. 1,
                lett. a), revocabile in qualsiasi momento.
              </li>
            </ul>
          </section>

          <section className={styles.sezione} aria-labelledby="cookie">
            <h2 id="cookie">4. Cookie e tecnologie simili</h2>
            <p>
              Questo sito non utilizza cookie di profilazione né strumenti di
              analisi o tracciamento di terze parti.
            </p>
            <p>
              L&rsquo;unico dato salvato sul tuo dispositivo è il contenuto del
              carrello, conservato nella memoria locale del browser
              (localStorage). È uno strumento puramente tecnico, necessario a
              farti ritrovare il carrello: resta sul tuo dispositivo, non ci
              viene inviato e non richiede il tuo consenso. Puoi svuotarlo in
              qualsiasi momento cancellando i dati di navigazione del browser.
            </p>
            <p>
              Le pagine di pagamento di Stripe possono utilizzare cookie tecnici
              e di prevenzione delle frodi propri, descritti nell&rsquo;
              <a
                href="https://stripe.com/it/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="simple-link-3"
              >
                informativa privacy di Stripe
              </a>
              .
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="destinatari">
            <h2 id="destinatari">5. Con chi condividiamo i dati</h2>
            <p>
              Per far funzionare il negozio ci appoggiamo a fornitori
              selezionati, che trattano i dati per nostro conto come responsabili
              del trattamento o come titolari autonomi per i rispettivi servizi:
            </p>
            <ul>
              <li>
                <strong>
                  <a
                    href="https://stripe.com/it/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="simple-link-3"
                  >
                    Stripe Payments Europe, Ltd.
                  </a>
                </strong>{" "}
                — gestione dei pagamenti e del checkout.
              </li>
              <li>
                <strong>
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="simple-link-3"
                  >
                    Vercel Inc.
                  </a>
                </strong>{" "}
                — hosting e distribuzione del sito.
              </li>
              <li>
                <strong>Il corriere o operatore logistico</strong> incaricato
                della consegna, a cui comunichiamo i dati di spedizione.
              </li>
              <li>
                <strong>Autorità pubbliche e organi di controllo,</strong>{" "}
                quando la comunicazione è imposta dalla legge.
              </li>
            </ul>
            <p>
              Non vendiamo né cediamo i tuoi dati a terzi per finalità di
              marketing.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="trasferimenti">
            <h2 id="trasferimenti">6. Trasferimenti fuori dall&rsquo;Unione Europea</h2>
            <p>
              Alcuni fornitori (tra cui Stripe e Vercel) possono trattare i dati
              anche al di fuori dello Spazio Economico Europeo, ad esempio negli
              Stati Uniti. In questi casi il trasferimento avviene sulla base di
              garanzie adeguate previste dal GDPR, come le Clausole Contrattuali
              Standard della Commissione europea o una decisione di adeguatezza.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="conservazione">
            <h2 id="conservazione">7. Per quanto tempo li conserviamo</h2>
            <ul>
              <li>
                <strong>Dati di ordine e fatturazione:</strong> per il tempo
                necessario a gestire l&rsquo;acquisto e comunque per la durata
                prevista dagli obblighi fiscali e contabili (di norma 10 anni).
              </li>
              <li>
                <strong>Log tecnici:</strong> per un periodo limitato, il tempo
                necessario a garantire sicurezza e funzionamento del sito.
              </li>
              <li>
                <strong>Email di contatto:</strong> per il tempo necessario a
                gestire la richiesta e a dare seguito a eventuali domande
                collegate.
              </li>
            </ul>
          </section>

          <section className={styles.sezione} aria-labelledby="diritti">
            <h2 id="diritti">8. I tuoi diritti</h2>
            <p>In qualità di interessato hai il diritto di:</p>
            <ul>
              <li>accedere ai tuoi dati e ottenerne una copia;</li>
              <li>chiederne la rettifica o la cancellazione;</li>
              <li>ottenere la limitazione del trattamento o opporti ad esso;</li>
              <li>ricevere i tuoi dati in un formato strutturato e portabile;</li>
              <li>
                revocare in qualsiasi momento il consenso eventualmente
                prestato, senza pregiudicare i trattamenti già svolti.
              </li>
            </ul>
            <p>
              Per esercitare questi diritti scrivi a{" "}
              <a href={`mailto:${TITOLARE.email}`} className="simple-link-3">
                {TITOLARE.email}
              </a>
              : ti risponderemo nei tempi previsti dalla legge. Se ritieni che
              il trattamento violi il GDPR, hai diritto di proporre reclamo al{" "}
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
                className="simple-link-3"
              >
                Garante per la protezione dei dati personali
              </a>{" "}
              o all&rsquo;autorità di controllo del tuo Stato di residenza.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="sicurezza">
            <h2 id="sicurezza">9. Sicurezza</h2>
            <p>
              Adottiamo misure tecniche e organizzative adeguate a proteggere i
              dati da accessi non autorizzati, perdita o uso improprio. I
              pagamenti sono gestiti da Stripe su infrastruttura conforme allo
              standard PCI-DSS e le comunicazioni con il sito avvengono tramite
              connessione cifrata (HTTPS).
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="minori">
            <h2 id="minori">10. Minori</h2>
            <p>
              Il sito e i prodotti non sono rivolti a minori di 14 anni. Non
              raccogliamo consapevolmente dati di minori senza il consenso di
              chi esercita la responsabilità genitoriale.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="modifiche">
            <h2 id="modifiche">11. Modifiche a questa informativa</h2>
            <p>
              Possiamo aggiornare questa informativa per adeguarla a modifiche
              normative o del servizio. La versione in vigore è sempre quella
              pubblicata su questa pagina, con la data di ultimo aggiornamento
              indicata in alto.
            </p>
          </section>

          <section className={styles.sezione} aria-labelledby="contatti">
            <h2 id="contatti">12. Contatti</h2>
            <p>
              Per qualsiasi domanda su questa informativa o sul trattamento dei
              tuoi dati scrivi a{" "}
              <a href={`mailto:${TITOLARE.email}`} className="simple-link-3">
                {TITOLARE.email}
              </a>
              .
            </p>
          </section>
        </article>
      </Section>
    </main>
  );
}
