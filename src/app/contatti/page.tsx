import type { Metadata } from "next";
import Section from "@/ui/Section/Section";
import ContactForm from "@/components/ContactForm/ContactForm";
import { contacts } from "@/features/contacts";
import { cn } from "@/utils/ui";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Contatti · F.I.G.A.",
  description:
    "Scrivici o chiamaci: email, telefono e un form per dire la tua. F.I.G.A. ti risponde (quando finisce la partita).",
};

const { email, phone } = contacts;
const EmailIcon = email.Icon;
const PhoneIcon = phone.Icon;

// Registro brand (non è il percorso transazionale): titolazione manifesto
// come le altre pagine (titolo + divisore tricolore), contatti diretti in
// chiaro, poi il form su superficie dark (come la chiusura in home).
export default function ContattiPage() {
  return (
    <main>
      <Section aria-labelledby="contatti-titolo">
        <h1 id="contatti-titolo" className="text-h2 center-text">
          Contatti
        </h1>
        <div className={cn("tricolore", styles.divisore)} aria-hidden="true" />

        <p className={cn("large", "center-text", styles.intro)}>
          Ordini, resi, complimenti o insulti: scrivici. Ti rispondiamo appena
          possibile — di solito quando finisce la partita.
        </p>

        <div className={styles.diretti}>
          <a href={`mailto:${email.content}`} className={styles.contatto}>
            <EmailIcon aria-hidden="true" className={styles.icona} />
            <span>{email.content}</span>
          </a>
          <a href={phone.href} className={styles.contatto}>
            <PhoneIcon aria-hidden="true" className={styles.icona} />
            <span>{phone.content}</span>
          </a>
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="contatti-form-titolo">
        <h2
          id="contatti-form-titolo"
          className={cn("text-h3", "center-text", styles.formTitolo)}
        >
          Dicci la tua
        </h2>
        <ContactForm />
      </Section>
    </main>
  );
}
