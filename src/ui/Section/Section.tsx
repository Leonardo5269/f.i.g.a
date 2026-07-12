import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/ui";

interface SectionProps {
  children: ReactNode;
  /** Vertical padding via the global `.s-py` class. Defaults to true. */
  spacing?: boolean;
  /** Wrap children in a centered `.wrapper` container. Defaults to true. */
  wrapper?: boolean;
  /** Section element tag — defaults to "section". */
  as?: ElementType;
  /** Anchor id (e.g. "la-roba"). */
  id?: string;
  /** "dark" applies the global `.dark` theme scope (brand sections). */
  tone?: "light" | "dark";
  "aria-labelledby"?: string;
  className?: string;
}

export default function Section({
  children,
  spacing = true,
  wrapper = true,
  as: Tag = "section",
  id,
  tone = "light",
  "aria-labelledby": ariaLabelledby,
  className,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(spacing && "s-py", tone === "dark" && "dark", className)}
    >
      {wrapper ? <div className="wrapper">{children}</div> : children}
    </Tag>
  );
}
