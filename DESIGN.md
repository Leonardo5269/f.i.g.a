---
name: f.i.g.a.
description: Catalogo merchandising drenched-orange, pop italiana e sfacciata, cinque prodotti sotto un solo marchio orizzontale.
colors:
  marmellata: "#ed8712"
  marmellata-fonda: "#b15300"
  scorza: "#47270f"
  inchiostro: "#17110e"
  carta: "#fdfbf9"
  melanzana: "#4a1147"
  muted: "#5c5048"
  errore: "#a8321a"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 4.25rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.09em"
rounded:
  pill: "999px"
  none: "0px"
spacing:
  gutter: "clamp(1.25rem, 4.5vw, 3.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.inchiostro}"
    textColor: "{colors.carta}"
    rounded: "{rounded.pill}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.melanzana}"
  product-card:
    backgroundColor: "{colors.carta}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.none}"
---

# Design System: f.i.g.a.

## 1. Overview

**Creative North Star: "L'Etichetta Gigante"**

Un'etichetta da supermercato italiano anni '70 ingrandita a scala manifesto: colore pieno da inchiostro tipografico, lettering nero e grasso, franchezza da scaffale. Il riferimento incrocia tre mondi: la precisione irriverente di Taffo (la battuta regge perché il mestiere è serissimo), la drop page di MSCHF (un oggetto, zero spiegazioni, desiderio puro) e il culto costruito da Liquid Death su un prodotto banale. L'estetica è la grafica pop italiana da farmacia/drogheria: colori pieni, niente sfumature, tipografia che urla senza scusarsi.

Il marchio è **orizzontale, non verticale**: cinque prodotti (adesivo, maglietta, felpa, cappellino, sciarpa) hanno pari dignità nella griglia. Nessuno di loro è "il prodotto" del brand; il timbro di marca (il badge circolare "figa") è il vero North Star visivo, riprodotto identico su ogni articolo come un'etichetta cucita.

Questo sistema rifiuta esplicitamente: la scheda marketplace, la landing SaaS, il luxury pretenzioso, la bancarella discount, la politica reale (da PRODUCT.md) e, come anti-riferimento puntuale, il tema Shopify monoprodotto da dropshipping con hero anonimo, badge di fiducia e recensioni finte.

**Key Characteristics:**
- Superficie immersa nel colore brand (strategia Drenched): la pagina È l'arancio.
- Tipografia monofamiglia (Archivo) a pesi estremi: titoli enormi e neri, corpo essenziale.
- Ogni prodotto, un click: nessun carrello, nessuna configurazione di varianti.
- Motion "Responsive": stagger d'ingresso sulla griglia, feedback immediati su hover, nessuna coreografia che rallenti l'impulso.
- Irriverenza nel copy e nel visual, serietà assoluta nel percorso di pagamento.

## 2. Colors: La Marmellata

Strategia **Drenched**: il colore non decora la pagina, la costituisce.

**The Drenched Rule.** La superficie È il colore. L'arancio marmellata copre il fondo pagina, non un accento: chi arriva deve avere la sensazione di essere entrato dentro il packaging. I neutri esistono solo al servizio della leggibilità (testo, pannelli prodotto, esiti), mai come rifugio.

### Primary
- **Arancio Marmellata** (`oklch(0.72 0.165 60)` / #ed8712): fondo pagina e identità. Contrasto verificato ≥7.2:1 con l'Inchiostro sopra.
- **Marmellata Fonda** (`oklch(0.55 0.15 55)` / #b15300): variante profonda per bordi e stati su superfici arancioni.

### Secondary
- **Melanzana** (`oklch(0.3 0.11 330)` / #4a1147): accento di contrasto netto per hover dei bottoni e focus ring. Contrasto ≥13.9:1 con la Carta.

### Neutral
- **Inchiostro** (`oklch(0.185 0.012 55)` / #17110e): testo primario, silhouette dei capi, bottoni. Contrasto 18.1:1 su Carta, 7.2:1 su Marmellata.
- **Scorza** (`oklch(0.31 0.06 55)` / #47270f): testo secondario su fondo arancione (etichette, meta). Contrasto 5.2:1 su Marmellata.
- **Carta** (`oklch(0.99 0.004 75)` / #fdfbf9): pannelli che staccano dal drench (card prodotto, pannelli esito).
- **Muted** (`oklch(0.44 0.02 55)` / #5c5048): testo secondario su Carta. Contrasto 7.6:1.

**The Serious Checkout Rule.** Il percorso transazionale (prezzo, pulsante, esiti success/cancel) usa i valori a contrasto più alto e più convenzionale del sistema: lì la fiducia batte la battuta.

## 3. Typography

**Display Font:** Archivo (variabile, asse `wdth`), con fallback system-ui
**Body Font:** Archivo, stessa famiglia, peso regolare

**Character:** Una sola famiglia grassa e geometrica portata ai suoi estremi: Black/900 per i titoli a scala manifesto, Regular/500 per il corpo. Il contrasto lo fanno peso e dimensione, non la moltiplicazione dei font. Voce da insegna, non da rivista.

### Hierarchy
- **Display** (900, `clamp(2.5rem, 8vw, 4.25rem)`, line-height 0.98): titolo di pagina ("Il Merchandising Ufficiale."). Una sola occorrenza per viewport.
- **Headline** (900, 1.25–2.5rem): titoli di sezione e nome prodotto in ogni card.
- **Body** (500, 1rem, line-height 1.55, max 46–52ch): lead e tagline di prodotto.
- **Label** (700, 0.6875–0.875rem, letter-spacing 0.08–0.09em, uppercase): meta di prodotto (Fit/Materiale), testata istituzionale.

**The One Family Rule.** Una famiglia sola. Se serve più contrasto, si aumenta il divario di peso o di corpo, non si aggiunge un font.

## 4. Elevation

Piatto per default, coerente con l'energia "Responsive": le superfici sono inchiostro pieno su carta, senza ombre ambientali morbide. L'unica "ombra" del sistema è il **timbro-ombra** (`8px 8px 0 var(--inchiostro)`): un'ombra dura, offset netto, senza blur, che legge come un timbro pressato sulla carta piuttosto che come un'elevazione fisica. Sale a `11px 11px 0` sull'hover delle card prodotto, come risposta a uno stato, mai come decorazione a riposo.

## 5. Components

### Product Card
- **Forma:** pannello Carta, bordo pieno 3px Inchiostro, timbro-ombra. Nessun arrotondamento (spigolo vivo, coerente con l'etichetta).
- **Contenuto:** grafica del capo (line-art Inchiostro + patch di marca) → nome (900) → tagline (Muted) → meta Fit/Materiale (griglia 2 colonne, separata da hairline) → prezzo (900, grande) → bottone.
- **Hover:** `translateY(-4px)` + timbro-ombra che si allunga a 11px; la grafica interna scala 1.035×.
- **Ingresso:** stagger di griglia, `translateY(14px)→0` + fade, 70ms di ritardo per indice, disattivato su `prefers-reduced-motion`.

### Patch (timbro di marca)
- **Forma:** cerchio pieno Inchiostro, anello tratteggiato Marmellata all'interno, wordmark "figa" in Marmellata, peso 900.
- **Uso:** riprodotto identico su ogni capo (petto per maglietta/felpa, calotta per il cappellino, centro nastro per la sciarpa) e come cuore del timbro di marca grande in hero (il badge dell'Adesivo). È il vero segno distintivo del sistema, non un logo a parte.

### Buttons
- **Forma:** pillola (`border-radius: 999px`), nessuno spigolo vivo (contrasto intenzionale con gli spigoli vivi dei pannelli).
- **Primary ("Compralo ora"):** sfondo Inchiostro, testo Carta, 800/1.1875rem. Hover: sfondo Melanzana + `translateY(-2px)` + ombra diffusa Melanzana. Active: scala 0.98. Disabled (loading): sfondo Scorza, spinner rotante, `aria-busy`.
- **Secondary (link esito, "Torna al catalogo"):** stesso trattamento pillola, bordo Inchiostro pieno.

### Esito (success / cancel)
- **Timbro di stato:** badge inclinato -3°, bordo 3px (Melanzana per successo, Scorza per annullo), maiuscolo tracciato.
- **Pannello:** stesso linguaggio Carta + bordo + timbro-ombra delle product card, per coerenza sistemica.

## 6. Do's and Don'ts

### Do:
- **Do** immergere la pagina nell'Arancio Marmellata: il drench è l'identità, non un tema.
- **Do** usare una sola famiglia tipografica (Archivo) a pesi estremi; il titolo è il visual principale della pagina.
- **Do** riprodurre il Patch identico su ogni prodotto: è il segno di riconoscimento del catalogo, non un dettaglio decorativo variabile.
- **Do** mantenere il percorso di pagamento serio e ad altissimo contrasto ("The Serious Checkout Rule"): prezzo chiaro, un pulsante per prodotto, esiti senza ambiguità.
- **Do** garantire WCAG 2.2 AA: contrasto ≥4.5:1, focus visibile, target touch ≥44px, alternativa `prefers-reduced-motion`.
- **Do** trattare ogni prodotto della griglia con pari peso visivo: stessa struttura di card, stesso trattamento grafico line-art + patch.

### Don't:
- **Don't** sembrare un **tema Shopify generico** da dropshipping: hero anonimo, badge fiducia, recensioni finte (anti-riferimento dichiarato).
- **Don't** sembrare una **scheda marketplace**: griglie di specifiche, badge, stelline, box venditore, banner sconto (da PRODUCT.md).
- **Don't** sembrare una **landing SaaS**: gradienti viola, hero con metriche, card identiche a tre colonne, eyebrow tracciati su ogni sezione (da PRODUCT.md).
- **Don't** sembrare **luxury pretenzioso**: serif dorati, nero+oro, tono solenne da maison (da PRODUCT.md).
- **Don't** sembrare una **bancarella / discount**: urgenza urlata, countdown, "OFFERTA!!!", prezzi barrati (da PRODUCT.md).
- **Don't** trasformare lo slogan in un riferimento politico reale: resta un formato preso in prestito per un gadget-shop immaginario (da PRODUCT.md).
- **Don't** privilegiare un prodotto sugli altri nella griglia: nessuna card più grande, nessun badge "bestseller".
- **Don't** rifugiarsi nei neutri: una pagina beige o bianca con un tocco d'arancio tradisce la strategia Drenched.
- **Don't** usare gradient text, side-stripe colorate, glassmorphism o numerazioni di sezione decorative (ban assoluti del sistema).
