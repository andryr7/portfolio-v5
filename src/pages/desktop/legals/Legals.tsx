import { useGSAP } from "@gsap/react";
import styles from "./Legals.module.css";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { Link } from "wouter";

export function Legals() {
  useGSAP(() => {
    gsap.to(".page-container", { opacity: 1 });
  });

  return (
    <>
      <ReactLenis className={styles.pageContainer + " page-container"}>
        <div className={styles.container}>
          <p>
            Editor and property: This website is edited by Andry RATSIMBA and is
            his exclusive property.
            <br />
            <br />
            Hosting: This website is hosted by "Hostinger International LTD" -
            www.hostinger.fr located at "61 Lordou Vironos Street, 6023 Larnaca,
            Cyprus"
            <br />
            <br />
            Personal data: This website does not collect any personal data, and
            only uses cookies strictly necessary to make basic audience
            measures.
          </p>
          <br />
          <Link href="/">{"-> back to homepage"}</Link>
        </div>
      </ReactLenis>
    </>
  );
}
