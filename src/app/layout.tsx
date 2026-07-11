import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, Graduate } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});

const graduate = Graduate({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-graduate",
});

export const metadata: Metadata = {
  title: "F.I.G.A. · Facciamo Italia Grande Ancora",
  description:
    "Merch patriottico. Ignoranza di qualità, 100% Made in Italy. T-shirt, felpe, sciarpe, cappellini e adesivi f.i.g.a.",
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="it" className={`${archivo.variable} ${graduate.variable}`}>
      <body>{children}</body>
    </html>
  );
}
