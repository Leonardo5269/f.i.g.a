import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, Graduate } from "next/font/google";
import Navbar from "@/ui/Navbar/Navbar";
import Footer from "@/ui/Footer/Footer";
import { CartProvider } from "@/features/cart/CartContext";
import "@/sass/_global.scss";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  axes: ["wdth"],
});

const graduate = Graduate({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-title",
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
      <body>
        {/* Provider client, children server-renderizzati (children-as-props). */}
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
