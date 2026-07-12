"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./DropdownMenu.module.scss";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

export default function DropdownMenu({
  items,
  className,
  closeNavbar,
  children,
}: {
  items: { path: string; name: string }[];
  className?: string;
  closeNavbar: () => void;
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    setIsMenuOpen(false);
    closeNavbar();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef} className={`${styles["dropdown-menu"]} ${className}`}>
      <button
        onClick={toggleMenu}
        className={`${styles["selected-item"]} ${
          isMenuOpen ? styles.open : ""
        }`}
      >
        {children} <FaChevronDown className={isMenuOpen ? styles.open : ""} />
      </button>
      <ul className={`${styles.items} ${isMenuOpen ? styles.open : ""}`}>
        {items.map((item, i) => (
          <li key={i}>
            <Link href={item.path} onClick={closeMenu}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
