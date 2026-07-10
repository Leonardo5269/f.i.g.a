# f.i.g.a.

E-commerce MVP B2C multi-prodotto (merchandising fisico, acquisto d'impulso): Next.js 16 App Router + Stripe Checkout, deploy su Vercel, zero costi in idle. Catalogo in `src/lib/products.ts` (fonte di verità dei prezzi, letta solo server-side dall'API di checkout). Nessun database ancora: il fulfillment si aggancia nel webhook (`src/app/api/webhook/route.ts`), che riceve il `productId` acquistato via metadata della sessione Stripe.

## Comandi

- `npm run dev` — server di sviluppo
- `npm run build` — build di produzione (include typecheck)
- `npm run typecheck` — solo TypeScript

## Design Context

Il contesto strategico e visivo del progetto vive in due file alla radice, da leggere prima di qualsiasi lavoro su UI, copy o brand:

- **PRODUCT.md** — registro (brand), utenti, scopo, personalità ("irriverente, pop, diretto"), anti-riferimenti e principi di design. Marchio orizzontale (nessun prodotto è il volto del brand più di un altro). È la fonte di verità strategica.
- **DESIGN.md** — sistema visivo con token reali: North Star "L'Etichetta Gigante", strategia colore Drenched su arancio marmellata, monofamiglia Archivo a pesi estremi, il "Patch" (badge di marca) riprodotto identico su ogni prodotto.

Vincolo non negoziabile: l'irriverenza vive nel copy e nel visual, mai nel percorso transazionale (checkout, success, cancel), che resta serio, chiaro e WCAG 2.2 AA.
