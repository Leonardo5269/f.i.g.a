'use client';

import React, { useState, useTransition } from 'react';
import styles from './SendEmailForm.module.scss';

export async function addEmailAction(formData: FormData): Promise<{ error?: string }> {
  try {
    const email = formData.get('email') as string;

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return { error: error?.error || "Errore nell'inserimento dell'email" };
    }

    return {};
  } catch {
    return { error: "Errore di connessione al server" };
  }
}


export default function SendEmailForm({ addEmail }: { addEmail: (formData: FormData) => Promise<{ error?: string }>}) {
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { currentTarget } = e;

    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res= await addEmail(formData);
      if(res?.error) setError(res.error);
      else {
        currentTarget.reset();
        setSuccessMsg('Mail aggiunta con successo');
      }
    });
  }
  return (
    <div className={styles['send-emails']}>
      <form className={`mt-xxs`} onSubmit={handleSubmit}>
        <input type="email" id='email' name='email' placeholder='Email' required />
        <button className={`btn-1xs${isPending ? ' loading' : ''}`} type='submit'>Invia</button>
      </form>
      <p className={styles['error-msg']}>{error}</p>
      <p className={styles['success-msg']}>{successMsg}</p>
    </div>
  );
};
