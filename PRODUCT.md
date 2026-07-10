# Product

## Register

brand

## Users

Compratori d'impulso su mobile, arrivati da un link social o da passaparola. Non stanno "facendo shopping": sono atterrati su una pagina, hanno pochi secondi di attenzione e decidono di pancia. Il prezzo è basso (fascia ~10 €), quindi la barriera non è economica: è l'attrito. Il job to be done è "voglio questa cosa adesso, senza pensarci": la pagina deve trasformare la curiosità in desiderio e il desiderio in un click, prima che l'attenzione evapori.

## Product Purpose

E-commerce MVP B2C multi-prodotto: una piccola linea di merchandising (abbigliamento + adesivi) sotto un unico marchio orizzontale. Non esiste un prodotto ammiraglia: ogni articolo ha pari dignità nella griglia. Niente carrello, niente selezione di varianti, niente account: ogni prodotto ha il proprio pulsante d'acquisto diretto, un click apre una Checkout Session Stripe per quel solo articolo (quantità 1, taglia/configurazione fissa). Il successo si misura ancora in conversione visita → pagamento, ora sommata su più SKU. L'architettura (Next.js + Stripe Checkout, zero costi in idle) resta la stessa; il catalogo è dati, non complessità.

## Brand Personality

Irriverente, pop, diretto. Il marchio (F.I.G.A. = "Facciamo Italia Grande Ancora") gioca apertamente con il formato dello slogan patriottico da gadget-shop: tono sfacciato, zero formalità. Ma l'irriverenza è un'arma di precisione, non una scusa per la sciatteria: la battuta funziona solo se l'esecuzione è impeccabile. Emozione bersaglio: il sorriso complice di chi "ha capito", seguito immediatamente dalla voglia di possedere l'oggetto.

**Il Principio del Formato, non della Politica.** "Facciamo Italia Grande Ancora" è una battuta sul *formato* internazionale dello slogan da comizio riciclato in merchandising kitsch, non una posizione politica reale né un riferimento a persone o partiti specifici. Il brand è un gadget-shop immaginario che vende orgoglio nazionale finto e tascabile, nello stesso registro con cui si venderebbero souvenir "I ❤ NY": la sfacciataggine è nell'auto-parodia del genere, mai in un endorsement o in un attacco.

## Anti-references

- **Scheda marketplace** (Amazon/eBay): niente griglie di specifiche, badge, stelline, box venditore, banner sconto.
- **Landing SaaS**: niente gradienti viola, hero con metriche, card identiche a tre colonne, eyebrow tracciati su ogni sezione.
- **Luxury pretenzioso**: niente serif dorati, nero+oro, tono solenne da maison. L'oggetto è desiderabile perché è sfacciato, non perché è esclusivo.
- **Bancarella / discount**: niente urgenza urlata, countdown, "OFFERTA!!!", prezzi barrati. L'impulso nasce dal desiderio, mai dalla pressione.
- **Politica reale**: niente riferimenti a persone, partiti o eventi politici reali. Lo slogan è un formato preso in prestito, non un messaggio.

## Design Principles

1. **Ogni prodotto, un click.** Ogni card serve una sola decisione: comprare quell'articolo. Niente carrello, niente configuratore; l'attrito che il monoprodotto aveva eliminato non rientra dalla finestra con il catalogo.
2. **L'irriverenza è precisione.** Il tono sfacciato regge solo su un'esecuzione perfetta: tipografia curata, spaziature esatte, zero bug. Sfacciato + sciatto = spazzatura; sfacciato + preciso = brand.
3. **Desiderio prima della spiegazione.** L'oggetto si mostra e si provoca, non si descrive come una scheda tecnica. La pagina vende una voglia, non un elenco di caratteristiche.
4. **Il tono scherza, il checkout no.** L'irriverenza non tocca mai il percorso transazionale: prezzo chiaro, pagamento Stripe riconoscibile, esito (successo/annullo) comunicato senza ambiguità. La fiducia nel momento del pagamento è sacra.
5. **La velocità è parte della battuta.** Un acquisto d'impulso muore in un caricamento lento. Performance percepita istantanea, dal primo paint al redirect Stripe.
6. **Orizzontale, non verticale.** Nessun prodotto è il volto del brand più di un altro. Il marchio sta sopra la griglia, non dentro un singolo oggetto.

## Accessibility & Inclusion

WCAG 2.2 AA: contrasto ≥4.5:1 sul testo (≥3:1 sul testo grande), focus visibile su ogni elemento interattivo, target touch ≥44px (il pubblico è mobile-first), alternativa `prefers-reduced-motion` per ogni animazione, semantica HTML corretta per screen reader. L'irriverenza vive nel copy e nel visual, mai a scapito della leggibilità.
