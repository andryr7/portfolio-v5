import { Link } from "wouter";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div className={styles.itemContainer}>
        <Link href="/legals">legals</Link>
        <span style={{ textAlign: "right" }}>
          designed and
          <br />
          developed
          <br />
          at home
        </span>
      </div>
      <div className={styles.itemContainer}>
        <span>
          ©{year}
          <br />
          Andry Ratsimba
          <br />
          all rights reserved
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
