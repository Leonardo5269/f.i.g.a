import Image from "next/image";
import Section from "@/ui/Section/Section";
import { cn } from "@/utils/ui";
import styles from "./BrandWall.module.scss";

export interface Brand {
  /** Logo del brand; se assente si mostra il nome come testo. */
  imgUrl?: string;
  name: string;
}

interface BrandWallProps {
  brands: readonly Brand[];
}

export default function BrandWall({ brands }: BrandWallProps) {
  return (
    <Section spacing={false} className="mt-xxxl">
      <div className="center-text">
        <span className="eyebrow">Partners</span>
        <h2 className="text-h3 mt-regular">Pochi marchi, scelti bene</h2>
      </div>

      <ul className={cn(styles.wall, "mt-xxl")} aria-label="Marchi trattati">
        {brands.map((brand) => (
          <li key={brand.name} className={styles.brand}>
            {brand.imgUrl ? (
              <span className={styles.logo}>
                <Image
                  src={brand.imgUrl}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 521px) 150px, 170px"
                  style={{ objectFit: "contain" }}
                />
              </span>
            ) : (
              // Fallback: nessun logo → nome del brand come testo.
              <span className={styles.name}>{brand.name}</span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
