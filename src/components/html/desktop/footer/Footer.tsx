import { useLenis } from "lenis/react";
import styles from "./Footer.module.css";
import { Link } from "wouter";

export function Footer() {
  const year = new Date().getFullYear();
  const lenis = useLenis();

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Link to="/legals">legals{" ->"}</Link>
        <a onClick={() => lenis?.scrollTo(0)} style={{ cursor: "pointer" }}>
          {"<- "}back to the top
        </a>
      </div>
      <div className={styles.subContainer}>
        <div style={{ marginTop: "auto" }}>
          ©{year}
          <br />
          all rights reserved
          <br />
          designed and developed by
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
