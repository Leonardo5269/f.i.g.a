"use client";

import React, { useState } from "react";
import styles from "./Faq.module.scss";
import { FaChevronDown } from "react-icons/fa6";
import PlusToMinusBtn from "./PlusToMinusBtn/PlusToMinusBtn";

export default function Faq({
  question,
  response,
  className,
}: {
  question: string;
  response: string;
  className?: string;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className={`${styles["faq"]} ${styles["close"]} box-1 ${className}`}>
      <div
        className={styles["visible"]}
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        <h5>{question}</h5>
        {/* <button
          className={`${styles["open-faq-btn"]} ${
            openMenu ? styles["active"] : ""
          }`}
        >
          <FaChevronDown />
        </button> */}
        <PlusToMinusBtn isOpen={openMenu} />
      </div>
      <p className={`medium mt-regular ${openMenu ? "" : styles["close"]}`}>
        {response}
      </p>
    </div>
  );
}
