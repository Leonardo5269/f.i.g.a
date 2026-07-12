"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/ui/Logo/Logo";
import Button from "@/ui/Button/Button";
import HamburgerIcon from "./HamburgerIcon/HamburgerIcon";
import { ctaRoutes, routes } from "@/features/routes";
import { cn } from "@/utils/ui";
import styles from "./Navbar.module.scss";

// Contenuto minimo per ora: il sito è una one-page e le voci vivono in
// src/features/routes.ts (rotte future già predisposte lì, commentate, così
// come `ctaRoutes`). Quando arriveranno rotte con `children`, usare
// <DropdownMenu/> (@/components/DropdownMenu) per i sottomenu.
export default function Navbar() {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const closeMenu = () => setIsMenuOpened(false);
  const toggleMenu = () => setIsMenuOpened((prev) => !prev);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isMenuOpened);
    return () => document.body.classList.remove("no-scroll");
  }, [isMenuOpened]);

  // True appena la pagina lascia il top (cambia sfondo + ombra della barra).
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ultima CTA (Contatti) piena, le altre (Shop) outline.
  const ctaVariant = (i: number): "filled" | "outline" =>
    i === ctaRoutes.length - 1 ? "filled" : "outline";

  return (
    <nav
      className={cn(
        styles.navbar,
        isScrolled && styles.scrolled,
        isMenuOpened && styles.opened,
      )}
      aria-label="Navigazione principale"
    >
      <div className="wrapper">
        <Logo onClick={closeMenu} />

        <div className={styles["nav-container"]}>
          <div
            className={styles["tablet-vp"]}
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={isMenuOpened ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={isMenuOpened}
            aria-controls="primary-menu"
          >
            <HamburgerIcon isOpened={isMenuOpened} />
          </div>

          <ul
            id="primary-menu"
            className={`${styles["link-pages"]} ${
              isMenuOpened ? styles.show : styles.hide
            }`}
          >
            {routes.map((route) => (
              <li onClick={closeMenu} key={route.path}>
                <Link href={route.path}>{route.name}</Link>
              </li>
            ))}

            {/* CTA dentro il pannello mobile: affiancate con 12px di gap,
                come su desktop (nascoste su desktop). */}
            <li onClick={closeMenu} className={styles["cta-mobile"]}>
              {ctaRoutes.map((route, i) => (
                <Button
                  key={route.path}
                  href={route.path}
                  variant={ctaVariant(i)}
                >
                  {route.name}
                </Button>
              ))}
            </li>
          </ul>
        </div>

        {/* CTA su desktop (nascoste su tablet/mobile) */}
        <div className={styles["cta-desktop"]}>
          {ctaRoutes.map((route, i) => (
            <Button
              target={route.name === "Shop" ? "_blank" : "_self"}
              key={route.path}
              href={route.path}
              variant={ctaVariant(i)}
            >
              {route.name}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
