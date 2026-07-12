"use client";

import { useState, type FormEvent } from "react";
import Button from "@/ui/Button/Button";
import { cn } from "@/utils/ui";
import styles from "./ContactForm.module.scss";

// Seam per l'invio reale: oggi il form è un mock (nessun backend). Quando
// esisterà un endpoint, sostituire il corpo con una fetch a /api/contact —
// il componente non cambia.
async function submitContact(
  _data: FormData,
): Promise<{ ok: boolean; error?: string }> {
  // TODO(api/contact): POST verso l'endpoint quando esisterà.
  return { ok: true };
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const result = await submitContact(new FormData(event.currentTarget));
    if (result.ok) setSent(true);
  }

  if (sent) {
    return (
      <p className={styles.conferma} role="status">
        Messaggio ricevuto. Non aspettarti una risposta veloce.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.riga}>
        <label className="sr-only" htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          placeholder="NOME"
          required
          className={styles.campo}
        />

        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="EMAIL"
          required
          className={styles.campo}
        />
      </div>

      <label className="sr-only" htmlFor="messaggio">
        Messaggio
      </label>
      <textarea
        id="messaggio"
        name="messaggio"
        placeholder="MESSAGGIO"
        required
        rows={5}
        className={cn(styles.campo, styles.textarea)}
      />

      <Button
        type="submit"
        variant="filled"
        size="lg"
        className={styles.invia}
      >
        Manda
      </Button>
    </form>
  );
}
