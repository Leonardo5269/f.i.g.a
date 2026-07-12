import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/ui";
import styles from "./SectionHeading.module.scss";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Heading element — defaults to h2. Use h1 once per page. */
  as?: ElementType;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        styles.heading,
        align === "center" && styles.center,
        light && styles.light,
        className,
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className={eyebrow ? "mt-s" : undefined}>{title}</Heading>
      {lead && <p className={cn("large", styles.lead, "mt-m")}>{lead}</p>}
    </div>
  );
}
