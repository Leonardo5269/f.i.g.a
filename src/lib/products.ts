export interface Product {
  id: string;
  name: string;
  tagline: string;
  priceCents: number;
  fit: string;
  material: string;
  images?: string[];
}

// Fonte di verità del catalogo: prezzo in centesimi (interi) per
// eliminare i bug di approssimazione floating-point. Il checkout
// legge da qui lato server; il client non decide mai un prezzo.
export const PRODUCTS: Product[] = [
  {
    id: "adesivo",
    name: "L'Adesivo Ufficiale",
    tagline: "Vinile opaco, Ø 10 cm. Il classico, ridotto all'osso.",
    priceCents: 1000,
    fit: "Taglia unica",
    material: "Vinile opaco",
  },
  {
    id: "maglietta",
    name: "La Maglietta Ufficiale",
    tagline: "Cotone pesante, stampa che non sbiadisce prima del rimpianto.",
    priceCents: 2500,
    fit: "Taglia unica oversize",
    material: "100% cotone",
    images: [
      "/maglietta/maglietta-1.png",
      "/maglietta/maglietta-2.png",
      "/maglietta/maglietta-3.png",
    ],
  },
  {
    id: "felpa",
    name: "La Felpa Ufficiale",
    tagline: "Girocollo pesante, per quando l'orgoglio ha bisogno di maniche.",
    priceCents: 4500,
    fit: "Taglia unica oversize",
    material: "80% cotone, 20% poliestere",
    images: [
      "/felpa/felpa-1.png",
      "/felpa/felpa-2.png",
      "/felpa/felpa-3.png",
      "/felpa/felpa-4.png",
    ],
  },
  {
    id: "cappellino",
    name: "Il Cappellino Ufficiale",
    tagline: "Visiera curva, cinturino regolabile, aria da comizio.",
    priceCents: 2000,
    fit: "Taglia unica regolabile",
    material: "Cotone twill",
    images: [
      "/cappellino/cappellino-1.png",
      "/cappellino/cappellino-2.png",
      "/cappellino/cappellino-3.png",
      "/cappellino/cappellino-4.png",
    ],
  },
  {
    id: "sciarpa",
    name: "La Sciarpa Ufficiale",
    tagline: "Da stadio, non da montagna. Scalda l'idea, non il collo.",
    priceCents: 2200,
    fit: "180 × 20 cm",
    material: "Acrilico jacquard",
    images: [
      "/sciarpa/sciarpa-1.png",
      "/sciarpa/sciarpa-2.png",
      "/sciarpa/sciarpa-3.png",
      "/sciarpa/sciarpa-4.png",
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function formatEuros(cents: number): string {
  return (cents / 100).toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
