import type { ReactNode } from "react";
import { cn } from "@/utils/ui";
import styles from "./Chip.module.scss";

interface ChipProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Chip({ icon, children, className }: ChipProps) {
  return (
    <span className={cn(styles.chip, className)}>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
