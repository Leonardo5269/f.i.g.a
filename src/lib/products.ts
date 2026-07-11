export interface Product {
  id: string;
  name: string;
  priceCents: number;
  image: string;
  badge?: string;
}

// Fonte di verità del catalogo: prezzo in centesimi (interi) per
// eliminare i bug di approssimazione floating-point. Il checkout
// legge da qui lato server; il client non decide mai un prezzo.
export const PRODUCTS: Product[] = [
  {
    id: "maglietta-nera",
    name: 'T-SHIRT NERA "F.I.G.A."',
    priceCents: 3500,
    image: "/maglietta/maglietta-nera.jpg",
  },
  {
    id: "maglietta-bianca",
    name: 'T-SHIRT BIANCA "F.I.G.A."',
    priceCents: 3500,
    image: "/maglietta/t-shirt-bianca.jpg",
  },
  {
    id: "maglietta-bordeaux",
    name: 'T-SHIRT BORDEAUX "F.I.G.A."',
    priceCents: 3500,
    image: "/maglietta/maglietta-1.png",
  },
  {
    id: "felpa",
    name: 'FELPA NERA "F.I.G.A."',
    priceCents: 7500,
    image: "/felpa/felpa-nera.jpg",
  },
  {
    id: "felpa-girocollo-bordeaux",
    name: 'FELPA GIROCOLLO BORDEAUX "F.I.G.A."',
    priceCents: 7000,
    image: "/felpa/felpa-1.png",
  },
  {
    id: "sciarpa",
    name: "SCIARPA STADIO TRICOLORE",
    priceCents: 2500,
    image: "/sciarpa/sciarpa-1.png",
    badge: "DROP LIMITATO",
  },
  {
    id: "cappellino",
    name: 'CAPPELLINO "F.I.G.A."',
    priceCents: 3000,
    image: "/cappellino/cappellino-1.png",
  },
  {
    id: "adesivi",
    name: "STICKER PACK IGNORANTE",
    priceCents: 1000,
    image: "/stampe/stickers.jpg",
  },
  {
    id: "guanti",
    name: 'GUANTI IN PELLE "F.I.G.A."',
    priceCents: 4000,
    image: "/guanti/guanti-1.png",
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function formatEuros(cents: number): string {
  return (cents / 100).toLocaleString("it-IT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
