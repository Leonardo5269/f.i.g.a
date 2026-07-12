import React from "react";
import { IconType } from "react-icons";
import styles from "./Circle.module.scss";

interface CirclePropsType {
  Icon: string | IconType;
  href?: string;
  style?: React.CSSProperties;
  classname?: string | null;
}

export default function Circle({
  Icon,
  style,
  classname,
  href,
}: CirclePropsType) {
  if (typeof Icon === "string" && Icon.length !== 1) {
    throw new Error("The 'Icon' must be length 1.");
  }

  if (!href) {
    return (
      <span>
        <span className={`${styles.circle} ${classname}`} style={style}>
          {typeof Icon === "string" ? Icon : <Icon />}
        </span>
      </span>
    );
  }
  return (
    // target='_blank' rel="noopener noreferrer"
    <a href={href} aria-label="mini-link">
      <span className={`${styles.circle} ${classname}`} style={style}>
        {typeof Icon === "string" ? Icon : <Icon />}
      </span>
    </a>
  );
}
