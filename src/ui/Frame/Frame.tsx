import Image from "next/image";
import { cn } from "@/utils/ui";
import styles from "./Frame.module.scss";

interface FrameProps {
  /** Real photo path under /public. Omit to render a branded placeholder. */
  src?: string;
  alt: string;
  ratio?: string;
  rounded?: "none" | "md" | "lg" | "xl";
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Image surface. Renders an optimized next/image when a real `src` is
 * provided; otherwise a neutral placeholder that keeps the layout (and the
 * alt text, for assistive tech) intact until photos drop in.
 */
export default function Frame({
  src,
  alt,
  ratio = "4 / 3",
  rounded = "none",
  priority,
  sizes = "100vw",
  className,
}: FrameProps) {
  return (
    <div
      className={cn(styles.frame, styles[`r-${rounded}`], className)}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={styles.img}
        />
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderText} aria-hidden="true">
            Immagine da inserire
          </span>
          <span className="sr-only">{alt}</span>
        </div>
      )}
    </div>
  );
}
