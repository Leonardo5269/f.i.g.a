import Section from "@/ui/Section/Section";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./Closure.module.scss";

/** Chiusura manifesto: momento brand dark con invito al contatto (props-less). */
export default function Closure() {
  return (
    <Section tone="dark" className={styles.chiusura}>
      <h2 className={`text-h2 ${styles.titolo}`}>
        L&rsquo;Italia ti guarda.
        <br />
        Vestiti bene.
      </h2>
      <p className={styles.sub}>
        Hai domande? Vuoi insultarci? Compila il form qui sotto. Ti risponderemo
        (forse) quando finisce la partita.
      </p>

      <ContactForm />
    </Section>
  );
}
