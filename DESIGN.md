---
name: f.i.g.a.
description: Merch patriottico ultras/stadio, base e-commerce pulita orientata alla conversione con momenti da poster di propaganda. Verde bandiera, rosso corsa, sezioni dark/light alternate, slab serif monumentale + grotesque.
colors:
  verde-bandiera: "#008C45"
  bianco-rotto: "#F4F5F0"
  rosso-bandiera: "#CD212A"
  rosso-corsa: "#D40000"
  nero-quasi: "#0D0D0D"
typography:
  display:
    fontFamily: "'Graduate', Georgia, serif"
    fontSize: "clamp(2.75rem, 9vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.55
  label:
    fontFamily: "'Archivo Expanded', Archivo, system-ui, sans-serif"
    fontStretch: "condensed"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.14em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  sharp: "2px"
spacing:
  gutter: "clamp(1.25rem, 4.5vw, 3.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.rosso-corsa}"
    textColor: "{colors.bianco-rotto}"
    rounded: "{rounded.sharp}"
    padding: "1rem 2.25rem"
  button-primary-hover:
    backgroundColor: "{colors.rosso-bandiera}"
  product-card:
    backgroundColor: "{colors.bianco-rotto}"
    textColor: "{colors.nero-quasi}"
    rounded: "{rounded.none}"
  tricolor-divider:
    height: "4px"
    stops: ["{colors.verde-bandiera}", "{colors.bianco-rotto}", "{colors.rosso-bandiera}"]
---

# Design System: f.i.g.a.

## 1. Overview

**Creative North Star: "Il Manifesto da Stadio"**

Un manifesto da curva ultras stampato con la disciplina di un e-commerce che deve convertire: la base è pulita, veloce, leggibile — niente fronzoli da negozio — ma ogni tanto la pagina si concede un momento da poster di propaganda: nero pieno, tipografia monumentale, un'immagine drammatica. Il sistema alterna sezioni buie da brand (hero, CTA di chiusura) a sezioni chiare da prodotto (griglia, footer neutro), con lo stesso ritmo di un'etichetta cucita che torna identica su ogni capo.

Questo non è minimal-luxury (niente serif dorati, niente tono da maison) né corporate (niente card a tre colonne, niente gradienti). È una base e-commerce onesta — griglia prodotto leggibile, prezzo chiaro, bottone d'acquisto ovunque uguale — vestita con l'attitude di una curva: ironica, fiera, sfacciata, mai seria fino al ridicolo tranne dove serve fiducia (il percorso di pagamento).

**Key Characteristics:**
- Alternanza netta dark/light per sezione: il nero è il colore del brand-moment, il bianco rotto è il colore del prodotto.
- Tipografia a due registri: slab serif monumentale (stile "Graduate") per i titoli manifesto, grotesque pulito (Archivo) per corpo e UI, condensed uppercase per etichette/badge.
- Il tricolore (verde/bianco/rosso) è un accento sottile — riga divisoria, badge, sciarpa prodotto — mai un campo colore grande.
- Un solo bottone d'azione per superficie, sempre rosso corsa: nessuna ambiguità su cosa cliccare.
- Irriverenza nel copy e nell'immagine, serietà assoluta nel percorso transazionale.

## 2. Colors

**La regola dark/light per sezione.** Ogni sezione ha un solo scopo: o è un momento di brand (nero pieno, tipografia enorme) o è un momento di prodotto (bianco rotto, griglia leggibile). Non si mescolano mai nello stesso blocco.

### Primary
- **Nero Quasi** (`#0D0D0D`): fondo delle sezioni brand (navbar, hero, CTA di chiusura, footer). È il colore che porta il peso drammatico del manifesto.
- **Bianco Rotto** (`#F4F5F0`): fondo delle sezioni prodotto. Non è bianco puro — ha la temperatura della carta stampata, non dello schermo.

### Accent (tricolore, con moderazione)
- **Verde Bandiera** (`#008C45`): primo terzo della riga tricolore divisoria; mai un campo pieno.
- **Rosso Bandiera** (`#CD212A`): terzo terzo della riga tricolore; badge secondari, dettaglio sciarpa prodotto.
- **Rosso Corsa** (`#D40000`): riservato esclusivamente a CTA e badge ("COMPRA ORA", "ADD TO CART", "DROP LIMITATO", "MANDA"). Se è rosso corsa, è cliccabile o è un'urgenza — mai decorazione.

**The One CTA Color Rule.** Il rosso corsa identifica l'azione in ogni superficie della pagina: se compare, è un pulsante o un badge di rilievo. Non si usa altrove.

**The Serious Checkout Rule.** Il percorso transazionale (prezzo, pulsante d'acquisto, esiti success/cancel) resta ad alto contrasto e ai colori più convenzionali del sistema (nero quasi su bianco rotto, rosso corsa per l'azione): lì la fiducia batte la battuta.

## 3. Typography

**Display Font:** slab serif monumentale in stile "Graduate" (o equivalente da college jersey), sempre uppercase, sempre centrata nei blocchi di brand.
**Body/UI Font:** Archivo, grotesque pulito, per corpo testo, nome prodotto, form.
**Label Font:** una variante condensed uppercase di Archivo (o Archivo Expanded compresso), per eyebrow, badge, meta di prodotto.

**Character:** due registri distinti e mai mescolati nello stesso elemento. Il titolo da manifesto (slab serif) grida in blocco unico su due righe; la sans grottesca lavora in silenzio su prezzo, descrizione, form. Il condensed uppercase firma le etichette come uno stemma da toppa.

### Hierarchy
- **Display** (slab serif, uppercase, `clamp(2.75rem, 9vw, 6rem)`, line-height 0.95): headline manifesto dell'hero e della CTA di chiusura. Centrata o a due colonne, mai in corpo minore.
- **Section Title** (slab serif, uppercase, 1.75–2.75rem): titolo di sezione prodotto ("LA ROBA"), sempre con riga tricolore sotto.
- **Body** (Archivo 500, 1rem, line-height 1.55): sublinea hero, testo CTA, contenuto form.
- **Label** (condensed uppercase, 700, 0.75–0.875rem, letter-spacing 0.14em): eyebrow ("NUOVI ARRIVI"), nome prodotto in card, badge.

**The Two-Register Rule.** Se un testo deve gridare, è slab serif uppercase. Se deve informare o far agire (prezzo, form, bottone), è Archivo. Non c'è una terza famiglia.

## 4. Layout & Sections

Il sistema è definito sequenza per sequenza, non come componenti liberi: ogni sezione ha un fondo fisso e un solo compito.

### Navbar
Barra nero quasi, solo il logo "F.I.G.A." centrato in slab serif bianco. Nessun link, nessuna icona, nessun carrello visibile: la fiducia nel checkout monoprodotto rende superfluo il chrome da e-commerce classico.

### Hero (dark)
Fondo nero quasi, due colonne. Sinistra: eyebrow condensed uppercase, headline slab serif enorme su due righe, sublinea Archivo grigia, un solo CTA rosso corsa. Destra: fotografia drammatica a luce laterale, sfondo che si fonde nel nero della sezione — mai un riquadro isolato con bordo netto.

### Prodotti (light)
Fondo bianco rotto. Titolo di sezione centrato con riga tricolore come divisore. Griglia 3×2: foto su grigio chiaro, nome in Archivo, prezzo in grassetto, un bottone rosso corsa per card ("ADD TO CART"). Al massimo una card porta un badge rosso di rilievo ("DROP LIMITATO"); le altre restano di pari peso — coerente con il principio "orizzontale, non verticale" del marchio.

### CTA di chiusura + Contatto (dark)
Fondo nero quasi, headline slab serif centrata, sublinea ironica, poi un form semplice sulla stessa sezione scura: campi "Nome", "Email", "Messaggio" (textarea), bottone rosso corsa "MANDA". Input scuri con bordo sottile chiaro — mai un pannello bianco che rompe il fondo.

### Footer (dark)
Nero quasi, bordo superiore segnato dalla riga tricolore sottile. Logo, una riga di tagline, testo legale minimo, icone social. Compatto: il footer non ripete la headline del brand, la firma soltanto.

## 5. Components

### Tricolor Divider
Riga sottile a tre bande uguali (verde/bianco rotto/rosso), altezza 3–4px. Unico uso ammesso del tricolore come campo colore continuo, e solo come separatore, mai come sfondo di un blocco.

### Product Card
- **Forma:** pannello bianco rotto, foto su grigio chiaro, nessun bordo pesante, nessun arrotondamento.
- **Contenuto:** foto → nome (Archivo) → prezzo (Archivo bold) → bottone rosso corsa "ADD TO CART".
- **Badge di rilievo:** riservato a un solo prodotto per griglia, rosso corsa/bandiera, angolo superiore, condensed uppercase.

### Buttons
- **Primary (CTA hero, "ADD TO CART", "MANDA"):** sfondo rosso corsa, testo bianco rotto, angoli quasi vivi (2px), condensed o Archivo bold. Hover: sfondo rosso bandiera.
- **Un solo primary per superficie visibile**: mai due bottoni rosso corsa in competizione nello stesso blocco.

### Form (CTA di chiusura)
Campi scuri (fondo nero quasi o poco più chiaro) con bordo sottile chiaro, label Archivo, placeholder leggibile ad alto contrasto. Submit sempre rosso corsa.

## 6. Do's and Don'ts

### Do:
- **Do** alternare rigorosamente dark (brand) e light (prodotto) per sezione: mai un fondo intermedio o un gradiente fra i due.
- **Do** usare lo slab serif monumentale solo per i titoli da manifesto (hero, CTA di chiusura, titoli di sezione); tutto il resto in Archivo.
- **Do** trattare il tricolore come accento sottile: divisore, badge, dettaglio sul prodotto sciarpa. Mai un campo colore grande.
- **Do** riservare il rosso corsa esclusivamente a CTA e badge di rilievo: un solo significato in tutta la pagina.
- **Do** mantenere il percorso di pagamento serio e ad altissimo contrasto ("The Serious Checkout Rule"): prezzo chiaro, un pulsante per prodotto, esiti senza ambiguità.
- **Do** garantire WCAG 2.2 AA: contrasto ≥4.5:1, focus visibile, target touch ≥44px, alternativa `prefers-reduced-motion`.
- **Do** trattare ogni prodotto della griglia con pari peso visivo (eccetto il singolo badge di rilievo consentito).

### Don't:
- **Don't** sembrare **minimal-luxury**: niente serif dorati, niente nero+oro, niente tono solenne da maison.
- **Don't** sembrare **corporate/SaaS**: niente gradienti, niente card identiche a tre colonne generiche, niente eyebrow tracciati su ogni sezione senza motivo.
- **Don't** mischiare slab serif e grotesque nello stesso elemento di testo: sono due registri, non due opzioni intercambiabili.
- **Don't** usare il tricolore come sfondo di sezione o campo colore ampio: resta divisore, badge, dettaglio.
- **Don't** moltiplicare i bottoni rosso corsa nello stesso blocco visivo: un solo CTA primario per superficie.
- **Don't** trasformare lo slogan in un riferimento politico reale: resta un formato preso in prestito per un gadget-shop immaginario (da PRODUCT.md).
- **Don't** privilegiare un prodotto sugli altri nella griglia oltre al singolo badge "DROP LIMITATO" concesso.
- **Don't** usare gradient text, glassmorphism, ombre morbide diffuse o numerazioni di sezione decorative (ban assoluti del sistema).
</content>
</invoke>
