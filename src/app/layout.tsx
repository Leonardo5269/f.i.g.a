import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "f.i.g.a. · Il Merchandising Ufficiale",
  description:
    "Adesivi, magliette, felpe, cappellini e sciarpe f.i.g.a.: cinque pezzi, un solo marchio, un click a testa per la cassa Stripe.",
};

export const viewport: Viewport = {
  themeColor: "#ed8712",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="it" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
