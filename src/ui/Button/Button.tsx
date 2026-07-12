import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/ui";

type Variant = "filled" | "outline" | "secondary";
type Size = "md" | "lg";

const CLASS_MAP: Record<Variant, Record<Size, string>> = {
  filled: { md: "btn-1", lg: "btn-1l" },
  outline: { md: "btn-2", lg: "btn-2l" },
  secondary: { md: "btn-3", lg: "btn-3l" },
};

interface ButtonProps {
  children: ReactNode;
  /** Render as a Link when set; otherwise a native button. */
  href?: string;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  /** Busy state (native button only): adds `.loading`, `aria-busy`, disables. */
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  href,
  variant = "filled",
  size = "md",
  block,
  loading,
  className,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
}: ButtonProps) {
  const classes = cn(
    CLASS_MAP[variant][size],
    block && "btn-block",
    loading && "loading",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
