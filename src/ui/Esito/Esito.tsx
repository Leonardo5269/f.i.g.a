import type { ReactNode } from "react";
import Button from "@/ui/Button/Button";
import { cn } from "@/utils/ui";
import styles from "./Esito.module.scss";

interface EsitoProps {
  /** Testo del timbro in alto (es. "Pratica approvata"). */
  stamp: string;
  /** Variante grigia del timbro per l'esito annullato. */
  cancelled?: boolean;
  title: string;
  /** Corpo del messaggio. */
  children: ReactNode;
  /** Blocco riferimento opzionale (es. id sessione Stripe). */
  reference?: { label: string; value: string };
  actionHref: string;
  actionLabel: string;
  /** Chiosa ironica opzionale, dopo l'azione. */
  chiosa?: string;
}

/**
 * Superficie degli esiti checkout (success/cancel). Serious Checkout Rule:
 * registro sobrio, alto contrasto, convenzionale — qui non si scherza.
 */
export default function Esito({
  stamp,
  cancelled = false,
  title,
  children,
  reference,
  actionHref,
  actionLabel,
  chiosa,
}: EsitoProps) {
  return (
    <div className={styles.esito}>
      <div className={styles.pannello}>
        <p className={cn(styles.timbro, cancelled && styles.annullato)}>
          {stamp}
        </p>
        <h1 className={styles.titolo}>{title}</h1>
        <p className={styles.testo}>{children}</p>

        {reference && (
          <p className={styles.rif}>
            <strong>{reference.label}</strong>
            {reference.value}
          </p>
        )}

        <Button variant="secondary" size="lg" href={actionHref}>
          {actionLabel}
        </Button>

        {chiosa && <p className={styles.chiosa}>{chiosa}</p>}
      </div>
    </div>
  );
}
