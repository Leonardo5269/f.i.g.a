"use client";

import { MAX_QTY_PER_LINE } from "@/features/cart/cart";
import { cn } from "@/utils/ui";
import styles from "./QtyStepper.module.scss";

interface QtyStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  /** aria-label del gruppo. */
  label?: string;
  /** "md" scheda prodotto, "sm" riga carrello. */
  size?: "md" | "sm";
}

/**
 * Stepper quantità del percorso transazionale (Serious Checkout Rule):
 * bottoni −/+ con target ≥44px, valore annunciato via aria-live.
 */
export default function QtyStepper({
  value,
  onChange,
  min = 1,
  max = MAX_QTY_PER_LINE,
  label = "Quantità",
  size = "md",
}: QtyStepperProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(styles.stepper, size === "sm" && styles.small)}
    >
      <button
        type="button"
        aria-label="Diminuisci quantità"
        disabled={value <= min}
        onClick={() => onChange(Math.max(value - 1, min))}
      >
        &minus;
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label="Aumenta quantità"
        disabled={value >= max}
        onClick={() => onChange(Math.min(value + 1, max))}
      >
        +
      </button>
    </div>
  );
}
