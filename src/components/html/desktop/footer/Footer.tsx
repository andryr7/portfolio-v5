import { useLenis } from "lenis/react";
import styles from "./Footer.module.css";
import { Link } from "wouter";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Footer() {
  const year = new Date().getFullYear();
  const lenis = useLenis();
  const lang = usePortfolioStore((state) => state.language);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Link to="/legals" className={styles.footerLink}>
          {lang === "en" ? "legals" : "mentions légales"}
          {" ->"}
        </Link>
        <a onClick={() => lenis?.scrollTo(0)} className={styles.footerLink}>
          {"<- "}
          {lang === "en" ? "back to the top" : "retour en haut"}
        </a>
      </div>
      <div className={styles.subContainer}>
        <div style={{ marginTop: "auto" }}>
          ©{year}
          <br />
          {lang === "en" ? "all rights reserved" : "tous droits réservés"}
          <br />
          {lang === "en"
            ? "designed and developed by"
            : "conçu et développé par"}
        </div>
        <span>
          Andry
          <br />
          Ratsimba
        </span>
      </div>
    </div>
  );
}
