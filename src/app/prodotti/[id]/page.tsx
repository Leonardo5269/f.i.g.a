import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProductById } from "@/lib/products";
import Section from "@/ui/Section/Section";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import styles from "./page.module.scss";

interface PageProps {
  // Next 16: i parametri di rotta sono asincroni.
  params: Promise<{ id: string }>;
}

// Pre-render statico di ogni scheda prodotto in vendita: zero costo in idle.
// I "coming soon" non hanno scheda dedicata finché non sono acquistabili.
export function generateStaticParams(): Array<{ id: string }> {
  return PRODUCTS.filter((product) => !product.comingSoon).map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return { title: "Prodotto non trovato · f.i.g.a." };
  }
  return {
    title: `${product.name} · f.i.g.a.`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  // "Coming soon" = non ancora in vendita: nessuna scheda acquistabile.
  if (!product || product.comingSoon) notFound();

  return (
    <main>
      <Section aria-labelledby="prodotto-nome">
        <Link href="/#la-roba" className={styles.back}>
          ← Torna alla Roba
        </Link>
        <ProductDetail product={product} />
      </Section>
    </main>
  );
}
