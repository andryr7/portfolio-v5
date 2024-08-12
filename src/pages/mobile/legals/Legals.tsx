import { Link } from "wouter";
import styles from "./Legals.module.css";

export function Legals() {
  return (
    <div className={styles.container}>
      {" "}
      <p>
        Editor and property: This website is edited by Andry RATSIMBA and is his
        exclusive property.
        <br />
        Hosting: This website is hosted by "Hostinger International LTD" -
        www.hostinger.fr located at "61 Lordou Vironos Street, 6023 Larnaca,
        Cyprus"
        <br />
        Personal data: This website does not collect any personal data, and only
        uses cookies strictly necessary to make basic audience measures.
      </p>
      <br />
      <Link href="/">{"-> back to homepage"}</Link>
    </div>
  );
}
