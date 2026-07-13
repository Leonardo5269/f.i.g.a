interface RouteType {
  path: string;
  name: string;
  children?: RouteType[];
}

export const routes: RouteType[] = [
  {
    path: "/#la-roba",
    name: "La Roba",
  },
  // Rotte future — decommentare quando le pagine esisteranno:
  // { path: "/chi-siamo", name: "Chi Siamo" },
  // { path: "/drops", name: "Drops" },
  // { path: "/faq", name: "FAQ" },
  // { path: "/contatti", name: "Contatti" },
];

// Il carrello ha una UI dedicata (icona in navbar, voce con icona in
// footer): NON va in `routes`, che alimenta il menu a tendina "Menù".
export const cartRoute: RouteType = { path: "/carrello", name: "Carrello" };
