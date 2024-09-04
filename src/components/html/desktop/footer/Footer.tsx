import { useLenis } from "lenis/react";
import styles from "./Footer.module.css";
import { Link } from "wouter";
import { useTranslatedText } from "@/handlers/useTranslatedText";

export function Footer() {
  const year = new Date().getFullYear();
  const lenis = useLenis();
  const legalsLinkText = useTranslatedText("legals", "mentions légales");
  const returnLinkText = useTranslatedText("back to the top", "retour en haut");
  const copyrightLinkText = useTranslatedText(
    "all rights reserved",
    "tous droits réservés"
  );
  const creditsText = useTranslatedText(
    "designed and developed by",
    "conçu et développé par"
  );

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Link to="/legals" className={styles.footerLink}>
          {legalsLinkText}
          {" ->"}
        </Link>
        <a onClick={() => lenis?.scrollTo(0)} className={styles.footerLink}>
          {"<- "}
          {returnLinkText}
        </a>
      </div>
      <div className={styles.subContainer}>
        <div style={{ marginTop: "auto" }}>
          ©{year}
          <br />
          {copyrightLinkText}
          <br />
          {creditsText}
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
