"use client";

import { useState, type FormEvent } from "react";
import Button from "@/ui/Button/Button";
import { cn } from "@/utils/ui";
import styles from "./ContactForm.module.scss";

// Seam per l'invio: POST a /api/contact. La firma resta invariata così il
// resto del componente non cambia se un domani si sostituisce il trasporto.
async function submitContact(
  data: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const payload = {
    nome: String(data.get("nome") ?? ""),
    email: String(data.get("email") ?? ""),
    messaggio: String(data.get("messaggio") ?? ""),
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false };
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setFailed(false);
    // I valori restano nel form: su errore li teniamo per il retry.
    const result = await submitContact(new FormData(event.currentTarget));
    setSending(false);

    if (result.ok) setSent(true);
    else setFailed(true);
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
          maxLength={100}
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
        maxLength={5000}
        rows={5}
        className={cn(styles.campo, styles.textarea)}
      />

      {failed && (
        <p className={styles.errore} role="alert">
          Qualcosa è andato storto e il messaggio non è partito. Riprova tra un
          attimo — il testo è ancora tutto lì.
        </p>
      )}

      <Button
        type="submit"
        variant="filled"
        size="lg"
        loading={sending}
        className={styles.invia}
      >
        {sending ? "Invio…" : "Manda"}
      </Button>
    </form>
  );
}
