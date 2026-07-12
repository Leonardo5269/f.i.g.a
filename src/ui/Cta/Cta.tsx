import Button from "@/ui/Button/Button";
import Section from "@/ui/Section/Section";
import styles from "./Cta.module.scss";

interface CtaProps {
  /** Testo a sinistra. */
  text: string;
  /** Etichetta del bottone/link. */
  linkLabel: string;
  /** Destinazione del bottone/link. */
  linkHref: string;
}

export default function Cta({ text, linkLabel, linkHref }: CtaProps) {
  return (
    <Section>
      <div className={styles.cta}>
        <p className={styles.text}>{text}</p>
        <Button href={linkHref} variant="filled" target="_blank">
          {linkLabel}
        </Button>
      </div>
    </Section>
  );
}
