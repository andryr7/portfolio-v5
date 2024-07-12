import { Footer } from "../../home/footer/Footer";
import styles from "./WorkFooter.module.css";

export function WorkFooter() {
  return (
    <>
      <div style={{ backgroundColor: "var(--color-main)" }}>
        <div className={styles.footerLinksContainer}>
          <div className={styles.footerButton}>test 1</div>
          <div className={styles.footerButton}>test 2</div>
          <div className={styles.footerButton}>test 3</div>
        </div>
      </div>
      <footer className={styles.footerContainer}>
        <Footer />
      </footer>
    </>
  );
}
