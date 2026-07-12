"use client";

import React from "react";
import styles from "./HamburgerIcon.module.scss";

export default function HamburgerIcon({ isOpened }: { isOpened: boolean }) {
  const isMenuOpened = isOpened ? styles["open"] : "";
  return (
    <div className={`${styles["hamburger-icon"]} ${isMenuOpened}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
