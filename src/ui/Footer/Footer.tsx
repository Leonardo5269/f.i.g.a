import { routes } from "@/features/routes";
import { contacts } from "@/features/contacts";
import Logo from "../Logo/Logo";
import { cn } from "@/utils/ui";
import styles from "./Footer.module.scss";
import Link from "next/link";
// Predisposizioni future — decommentare insieme ai blocchi qui sotto quando
// esisteranno dati reali (src/features/contacts.ts, socials.ts) e l'endpoint
// newsletter (/api/user):
// import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { socials } from "@/features/socials";
// import Circle from "@/components/Circle/Circle";
// import SendEmailForm, { addEmailAction } from "./SendEmailForm/SendEmailForm";

export default function Footer() {
  return (
    <footer className={cn(styles.footer, "dark")}>
      <div className="tricolore" aria-hidden="true" />

      <div className={cn("wrapper", styles.corpo)}>
        <div className={styles.columns}>
          <div className={styles.main}>
            <Logo />
            <p className={cn("font-size-small", styles.tagline)}>
              Ignoranza di qualità. 100% Made in Italy.
            </p>

            {/* Newsletter — riattivare quando esisterà l'endpoint /api/user.
            <p className="mt-xl">Iscriviti alla nostra newsletter</p>
            <SendEmailForm addEmail={addEmailAction} />
            <p className="font-size-small mt-xxs">
              Inviando il form, accetti i{" "}
              <Link href="/privacy-cookie" className="simple-link-3">
                Termini e condizioni
              </Link>
            </p>
            */}

            {/* Socials — riattivare con i profili reali (src/features/socials.ts).
            <div className={`mt-xl ${styles.socials}`}>
              <Circle Icon={FaInstagram} href={socials.instagram} classname={styles.circle} />
              <Circle Icon={FaFacebook} href={socials.facebook} classname={styles.circle} />
              <Circle Icon={FaXTwitter} href={socials.x} classname={styles.circle} />
              <Circle Icon={FaYoutube} href={socials.youtube} classname={styles.circle} />
              <Circle Icon={FaLinkedin} href={socials.linkedin} classname={styles.circle} />
            </div>
            */}
          </div>

          <div className={styles.routes}>
            <div className={styles.col}>
              <p className={cn("label", styles.heading)}>Naviga</p>
              <ul className="mt-xs no-style">
                {routes.map((route) => (
                  <li key={route.path}>
                    <Link className="simple-link" href={route.path}>
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonna contatti — riattivare con i dati reali
                (src/features/contacts.ts: email, telefono, indirizzo).
            <div className={styles.col}>
              <p className={cn("label", styles.heading)}>Contatti</p>
              <ul className={`mt-xs no-style ${styles["contacts-list"]}`}>
                <li>
                  <contacts.email.Icon />
                  <a href={`mailto:${contacts.email.content}`} className="simple-link">
                    {contacts.email.content}
                  </a>
                </li>
              </ul>
            </div>
            */}
          </div>
        </div>

        <hr className="mt-xxl" />

        <div className={`mt-xl ${styles.line}`}>
          <nav className={styles.legal} aria-label="Link legali">
            {/* TODO: collegare le pagine legali reali quando esisteranno. */}
            <a href="#" className="simple-link">
              Privacy
            </a>
            <a href="#" className="simple-link">
              Terms
            </a>
            <a href="#" className="simple-link">
              Shipping
            </a>
            <a href="#" className="simple-link">
              Contact
            </a>
          </nav>
          <span className="font-size-small">
            © 2026 {contacts.company}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
