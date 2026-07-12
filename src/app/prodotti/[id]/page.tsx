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

// Pre-render statico di ogni scheda prodotto: zero costo in idle.
export function generateStaticParams(): Array<{ id: string }> {
  return PRODUCTS.map((product) => ({ id: product.id }));
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
  if (!product) notFound();

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
