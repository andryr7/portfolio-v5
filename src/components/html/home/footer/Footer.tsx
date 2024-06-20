import { useLenis } from "lenis/react";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  const lenis = useLenis();

  return (
    <div className={styles.container}>
      <div className={styles.linksContainer}>
        <a>data policy{" ->"}</a>
        <a onClick={() => lenis?.scrollTo(0)}>{"<- "}back to the top</a>
      </div>
      <div className={styles.marqueeContainer}>
        <div className={styles.nameContainer}>
          designed and
          <br />
          developed at home
        </div>
        <div className={styles.copyrightContainer}>
          ©{year}
          <br />
          Andry Ratsimba
          <br />
          all rights reserved
        </div>
      </div>
    </div>
  );
}
