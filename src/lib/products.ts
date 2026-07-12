// ============================================================
// Catalogo f.i.g.a — fonte di verità del prezzo (centesimi interi,
// niente float). Il checkout legge da qui LATO SERVER: il client
// manda solo un id, mai un importo.
//
// Un prodotto = un tipo di indumento (t-shirt, felpa, …). Le varianti
// (colore, taglia) sono proprietà del prodotto, non righe separate.
// ============================================================

export type GarmentType =
  | "t-shirt"
  | "felpa-girocollo"
  | "felpa-cappuccio"
  | "sciarpa"
  | "cappello"
  | "guanti"
  | "sticker";

/** Etichetta leggibile del tipo (eyebrow della scheda prodotto). */
export const GARMENT_LABEL: Record<GarmentType, string> = {
  "t-shirt": "T-shirt",
  "felpa-girocollo": "Felpa girocollo",
  "felpa-cappuccio": "Felpa con cappuccio",
  sciarpa: "Sciarpa",
  cappello: "Cappello",
  guanti: "Guanti",
  sticker: "Sticker",
};

/** Variante colore: quadratino + immagine dedicata. */
export interface ColorOption {
  name: string;
  /** Valore CSS del quadratino: hex, oppure un gradiente (es. il tricolore). */
  swatch: string;
  /**
   * Immagine dell'indumento in questo colore. Finché non arrivano le foto
   * per ogni variante, i colori senza scatto puntano allo scatto esistente.
   */
  image: string;
}

/**
 * "Avvertimento": il timbro della card ("ULTIMO ARRIVO", "BEST SELLER"…).
 * - `rilievo` → rosso corsa, UNO SOLO per griglia (One CTA Color Rule, DESIGN.md).
 * - `neutro`  → timbro scuro, ripetibile su più card senza creare gerarchia.
 */
export interface Badge {
  label: string;
  tone?: "rilievo" | "neutro";
}

export interface Product {
  id: string;
  type: GarmentType;
  /** Nome goliardico (registro Archivo, non un titolo manifesto). */
  name: string;
  /** Mini descrizione: vende la voglia, non la scheda tecnica. */
  description: string;
  /** Prezzo effettivo in centesimi — quello che si paga davvero. */
  priceCents: number;
  /** Listino pre-sconto in centesimi: mostrato barrato quando presente. */
  originalPriceCents?: number;
  material?: string;
  /** Taglie disponibili (assenti su sciarpa / cappello / sticker). */
  sizes?: string[];
  /** Varianti colore (assenti sugli sticker). */
  colors?: ColorOption[];
  badge?: Badge;
  /** Immagine principale / fallback (quando non c'è variante colore). */
  image: string;
}

const NERO = "#0d0d0d";
const BIANCO = "#f4f5f0";
const BORDEAUX = "#6e1f2a";
const VERDE = "#008c45";
const ANTRACITE = "#3a3a3a";
const MARRONE = "#5a3a22";
// Unico caso di quadratino non-tinta-piatta: la sciarpa è il tricolore.
const TRICOLORE =
  "linear-gradient(135deg, #008c45 0 33.33%, #f4f5f0 33.33% 66.66%, #cd212a 66.66% 100%)";

export const PRODUCTS: Product[] = [
  {
    id: "t-shirt",
    type: "t-shirt",
    name: "Patriota della Domenica",
    description:
      "Cotone pesante e taglio dritto: l'orgoglio nazionale che indossi senza pensarci, dal divano allo stadio.",
    priceCents: 3500,
    material: "100% cotone pettinato, 180 g/m²",
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: { label: "Best Seller", tone: "neutro" },
    colors: [
      { name: "Nero", swatch: NERO, image: "/maglietta/maglietta-nera.jpg" },
      { name: "Bianco", swatch: BIANCO, image: "/maglietta/t-shirt-bianca.jpg" },
      { name: "Bordeaux", swatch: BORDEAUX, image: "/maglietta/maglietta-1.png" },
    ],
    image: "/maglietta/maglietta-nera.jpg",
  },
  {
    id: "felpa-girocollo",
    type: "felpa-girocollo",
    name: "Il Commissario Tecnico",
    description:
      "La felpa di chi la formazione la sa meglio del ct. Girocollo garzato, caldo da tripletta.",
    priceCents: 5900,
    originalPriceCents: 7000,
    material: "80% cotone, 20% poliestere — felpa garzata interno",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Bordeaux", swatch: BORDEAUX, image: "/felpa/felpa-1.png" },
      { name: "Nero", swatch: NERO, image: "/felpa/felpa-1.png" },
      { name: "Verde bandiera", swatch: VERDE, image: "/felpa/felpa-1.png" },
    ],
    image: "/felpa/felpa-1.png",
  },
  {
    id: "felpa-cappuccio",
    type: "felpa-cappuccio",
    name: "Ultrà da Divano",
    description:
      "Cappuccio profondo, felpa pesante: per tifare a squarciagola anche a partita finita.",
    priceCents: 7500,
    material: "80% cotone, 20% poliestere — 300 g/m²",
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: { label: "Ultimo Arrivo", tone: "neutro" },
    colors: [
      { name: "Nero", swatch: NERO, image: "/felpa/felpa-nera.jpg" },
      { name: "Antracite", swatch: ANTRACITE, image: "/felpa/felpa-nera.jpg" },
      { name: "Bordeaux", swatch: BORDEAUX, image: "/felpa/felpa-nera.jpg" },
    ],
    image: "/felpa/felpa-nera.jpg",
  },
  {
    id: "sciarpa",
    type: "sciarpa",
    name: "Inno a Squarciagola",
    description:
      "Lana jacquard tricolore da sventolare. Un drop soltanto, poi sparisce come un rigore sbagliato.",
    priceCents: 2500,
    material: "100% acrilico, tessitura jacquard tricolore",
    badge: { label: "Drop Limitato", tone: "rilievo" },
    colors: [
      { name: "Tricolore", swatch: TRICOLORE, image: "/sciarpa/sciarpa-1.png" },
    ],
    image: "/sciarpa/sciarpa-1.png",
  },
  {
    id: "cappello",
    type: "cappello",
    name: "Cappellino da Balcone",
    description:
      "Visiera strutturata e ricamo tricolore. Per cantare l'inno dal balcone con un minimo di stile.",
    priceCents: 3000,
    material: "100% cotone, visiera strutturata, chiusura regolabile",
    colors: [
      { name: "Nero", swatch: NERO, image: "/cappellino/cappellino-1.png" },
      { name: "Bianco", swatch: BIANCO, image: "/cappellino/cappellino-1.png" },
    ],
    image: "/cappellino/cappellino-1.png",
  },
  {
    id: "guanti",
    type: "guanti",
    name: "Il Capitano",
    description:
      "Vera pelle e fodera morbida: la stretta di mano del capitano che non hai mai avuto.",
    priceCents: 4000,
    material: "Vera pelle, fodera interna in cashmere",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Nero", swatch: NERO, image: "/guanti/guanti-1.png" },
      { name: "Marrone", swatch: MARRONE, image: "/guanti/guanti-1.png" },
    ],
    image: "/guanti/guanti-1.png",
  },
  {
    id: "sticker",
    type: "sticker",
    name: "Kit Attacca-Brighe",
    description:
      "Vinile impermeabile, colori che non mollano. Attaccali ovunque e semina un po' di sano orgoglio.",
    priceCents: 1000,
    material: "Vinile impermeabile, stampa UV resistente ai graffi",
    image: "/stampe/stickers.jpg",
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

/** Percentuale di sconto arrotondata, oppure null se il prodotto non è scontato. */
export function discountPercent(product: Product): number | null {
  const list = product.originalPriceCents;
  if (list === undefined || list <= product.priceCents) return null;
  return Math.round((1 - product.priceCents / list) * 100);
}

export function formatEuros(cents: number): string {
  return (cents / 100).toLocaleString("it-IT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
