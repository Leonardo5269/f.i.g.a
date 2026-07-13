"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/ui/Logo/Logo";
import HamburgerIcon from "./HamburgerIcon/HamburgerIcon";
import CartIndicator from "./CartIndicator/CartIndicator";
import AddedToCartModal from "@/components/AddedToCartModal/AddedToCartModal";
import { routes } from "@/features/routes";
import { useCart } from "@/features/cart/CartContext";
import { cn } from "@/utils/ui";
import styles from "./Navbar.module.scss";

/**
 * Barra a tre zone: trigger "Menù" a sinistra, logo centrato (128px),
 * carrello a destra. Il menu apre un pannello a tendina alto quanto il
 * suo contenuto (mai a schermo intero), identico a ogni viewport.
 * Le voci vivono in src/features/routes.ts; il carrello ne resta fuori
 * (ha la sua icona dedicata).
 */
export default function Navbar() {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { lastAdded, dismissLastAdded } = useCart();

  const closeMenu = () => setIsMenuOpened(false);
  const toggleMenu = () => setIsMenuOpened((prev) => !prev);

  // Click fuori dalla barra e tasto Esc chiudono il pannello
  // (Esc riporta il focus sul trigger).
  useEffect(() => {
    if (!isMenuOpened) return;

    const onMouseDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpened]);

  // True appena la pagina lascia il top (bordo inferiore della barra).
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(styles.navbar, isScrolled && styles.scrolled)}
      aria-label="Navigazione principale"
    >
      <div className={cn("wrapper", styles.bar)}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.menuTrigger}
          onClick={toggleMenu}
          aria-label={isMenuOpened ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={isMenuOpened}
          aria-controls="menu-panel"
        >
          <HamburgerIcon isOpened={isMenuOpened} />
          <span aria-hidden="true">Menù</span>
        </button>

        <Logo width={128} onClick={closeMenu} />

        <div className={styles.cartZone}>
          <CartIndicator onClick={closeMenu} />
          {lastAdded && (
            <AddedToCartModal
              item={lastAdded.item}
              onClose={dismissLastAdded}
            />
          )}
        </div>
      </div>

      {/* Pannello a tendina: alto quanto il contenuto, mai 100vh. */}
      <div
        id="menu-panel"
        className={cn(styles.panel, isMenuOpened && styles.open)}
        aria-hidden={!isMenuOpened}
      >
        <ul className={cn("wrapper", "no-style", styles.panelList)}>
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                onClick={closeMenu}
                tabIndex={isMenuOpened ? undefined : -1}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
