export interface Product {
  id: string;
  name: string;
  tagline: string;
  priceCents: number;
  fit: string;
  material: string;
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
  },
  {
    id: "felpa",
    name: "La Felpa Ufficiale",
    tagline: "Girocollo pesante, per quando l'orgoglio ha bisogno di maniche.",
    priceCents: 4500,
    fit: "Taglia unica oversize",
    material: "80% cotone, 20% poliestere",
  },
  {
    id: "cappellino",
    name: "Il Cappellino Ufficiale",
    tagline: "Visiera curva, cinturino regolabile, aria da comizio.",
    priceCents: 2000,
    fit: "Taglia unica regolabile",
    material: "Cotone twill",
  },
  {
    id: "sciarpa",
    name: "La Sciarpa Ufficiale",
    tagline: "Da stadio, non da montagna. Scalda l'idea, non il collo.",
    priceCents: 2200,
    fit: "180 × 20 cm",
    material: "Acrilico jacquard",
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
