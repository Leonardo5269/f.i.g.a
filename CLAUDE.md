# f.i.g.a.

E-commerce MVP B2C multi-prodotto (merchandising fisico, acquisto d'impulso): Next.js 16 App Router + Stripe Checkout, deploy su Vercel, zero costi in idle. Catalogo in `src/lib/products.ts` (fonte di verità dei prezzi, letta solo server-side dall'API di checkout). Nessun database ancora: il fulfillment si aggancia nel webhook (`src/app/api/webhook/route.ts`), che riceve il `productId` acquistato via metadata della sessione Stripe.

## Comandi

- `npm run dev` — server di sviluppo
- `npm run build` — build di produzione (include typecheck)
- `npm run typecheck` — solo TypeScript

## Design Context

Il contesto strategico e visivo del progetto vive in due file alla radice, da leggere prima di qualsiasi lavoro su UI, copy o brand:

- **PRODUCT.md** — registro (brand), utenti, scopo, personalità ("irriverente, pop, diretto"), anti-riferimenti e principi di design. Marchio orizzontale (nessun prodotto è il volto del brand più di un altro). È la fonte di verità strategica.
- **DESIGN.md** — sistema visivo con token reali: North Star "Il Manifesto da Stadio", attitude ultras/stadio su base e-commerce pulita, alternanza dark (nero quasi, brand) / light (bianco rotto, prodotto) per sezione, slab serif monumentale (stile "Graduate") per i titoli manifesto + Archivo per corpo/UI, tricolore verde/bianco/rosso usato solo come accento sottile (divisore, badge, dettaglio prodotto), rosso corsa riservato a CTA e badge di rilievo.

Vincolo non negoziabile: l'irriverenza vive nel copy e nel visual, mai nel percorso transazionale (checkout, success, cancel), che resta serio, chiaro e WCAG 2.2 AA.
