"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <p className="contatto-conferma" role="status">
        Messaggio ricevuto. Non aspettarti una risposta veloce.
      </p>
    );
  }

  return (
    <form className="contatto-form" onSubmit={handleSubmit}>
      <div className="contatto-riga">
        <label className="sr-only" htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          placeholder="NOME"
          required
          className="contatto-campo"
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
          className="contatto-campo"
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
        className="contatto-campo contatto-textarea"
      />

      <button type="submit" className="contatto-invia">
        MANDA
      </button>
    </form>
  );
}
