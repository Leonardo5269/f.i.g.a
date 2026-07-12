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

// One-CTA-Rule (DESIGN.md): un solo bottone rosso corsa per superficie —
// in home lo possiede l'hero. Popolare quando servirà una CTA in navbar:
// es. { path: "/#la-roba", name: "Compra Ora" }
export const ctaRoutes: RouteType[] = [];
