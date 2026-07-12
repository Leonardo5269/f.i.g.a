import type { ReactNode } from "react";
import { cn } from "@/utils/ui";
import styles from "./Card.module.scss";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  interactive?: boolean;
}

export default function Card({
  children,
  className,
  as: Tag = "div",
  interactive = false,
}: CardProps) {
  return (
    <Tag className={cn(styles.card, interactive && styles.interactive, className)}>
      {children}
    </Tag>
  );
}
