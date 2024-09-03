import { Link } from "wouter";
import styles from "./Footer.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Footer() {
  const lang = usePortfolioStore((state) => state.language);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div className={styles.itemContainer}>
        <Link href="/legals">
          {lang === "en" ? "legals" : "mentions légales"}
        </Link>
        <span style={{ textAlign: "right" }}>
          {lang === "en" ? "designed and" : "conçu et"}
          <br />
          {lang === "en" ? "developed" : "développé"}
          <br />
          {lang === "en" ? "at home" : "maison"}
        </span>
      </div>
      <div className={styles.itemContainer}>
        <span>
          ©{year}
          <br />
          Andry Ratsimba
          <br />
          {lang === "en" ? "all rights reserved" : "tous droits réservés"}
        </span>
        <div
          className={styles.scrollUpButton}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          {"->"}
        </div>
      </div>
    </footer>
  );
}
