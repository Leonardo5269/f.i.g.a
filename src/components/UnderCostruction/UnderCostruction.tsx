import React from "react";
import { FaPencilRuler } from "react-icons/fa";
import styles from "./UnderCostruction.module.scss";

export default function UnderCostruction({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={`${styles["under-costruction"]} wrapper`}>
      <FaPencilRuler />
      <h1 className="mt-m text-h4">Costruzione in corso</h1>
      <p className="mt-xxs">Ci vedremo presto!</p>
      {children}
    </div>
  );
}
