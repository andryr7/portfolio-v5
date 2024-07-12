import { Link, useRoute } from "wouter";
import styles from "./Work.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Work() {
  const [match, params] = useRoute("/work/:workname");
  const currentWork = usePortfolioStore((state) => state.worksData).find(
    (work) => work.slug.current === params?.workname
  );
  // console.log(currentWork);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div />
          <div className={styles.infoBlock}>
            <span>{currentWork?.caption}</span>
            <span>{currentWork?.type}</span>
          </div>
          <div className={styles.titleBlock}>
            <h1>{currentWork?.title}</h1>
            <span>{currentWork?.year}</span>
          </div>
        </header>
        <main>
          <section className={styles.section}>Project name - section 1</section>
          <section className={styles.section}>Project name - section 2</section>
        </main>
      </div>
      <footer className={styles.footerContainer}>
        <div className={styles.footerButton}>test 1</div>
        <div className={styles.footerButton}>test 2</div>
        <div className={styles.footerButton}>test 3</div>
      </footer>
    </>
  );
}
