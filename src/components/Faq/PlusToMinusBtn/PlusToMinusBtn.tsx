"use client";

import React from "react";
import styles from "./PlusToMinusBtn.module.scss";

export default function PlusToMinusBtn({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${styles["plus-to-minus-btn"]} ${isOpen ? styles["active"] : ""}`}
      onClick={onClick}
      aria-expanded={isOpen}
      type="button"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line
          className={styles["line-h"]}
          x1="1"
          y1="7"
          x2="13"
          y2="7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          className={styles["line-v"]}
          x1="7"
          y1="1"
          x2="7"
          y2="13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
