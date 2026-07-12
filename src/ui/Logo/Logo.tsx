import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.scss";

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={styles.logo}
      aria-label="F.I.G.A. — torna alla home"
    >
      <Image
        alt="F.I.G.A."
        src="/logo.svg"
        width={70}
        height={52}
        priority
        // SVG: Next non ottimizza gli SVG, così lo serviamo direttamente
        // (bypassa la cache di /_next/image) evitando loghi "fantasma".
        style={{ width: "auto", height: "52px" }}
      />
    </Link>
  );
}
