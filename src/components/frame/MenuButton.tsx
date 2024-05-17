import { Link } from "wouter";
import styles from "./MenuButton.module.css";

export function MenuButton() {
  return (
    <Link href="/" className={styles.menuButton}>
      <div className={styles.menuBar} />
    </Link>
  );
}
