import { Link, useRoute } from "wouter";
import styles from "./Home.module.css";

export function Home() {
  const [match] = useRoute("/");

  return (
    <>
      <header className={styles.placeholder}>Hero</header>
      <main>
        <section className={styles.placeholder}>
          Projects
          <Link href="/work/jacky">Test link</Link>
        </section>
        <section className={styles.placeholder}>About - presentation</section>
        <section className={styles.placeholder}>About - skills</section>
        <section className={styles.placeholder}>About - techs</section>
        <section className={styles.placeholder}>Contact</section>
      </main>
      <footer className={styles.placeholder} style={{ height: "50vh" }}>
        Footer
      </footer>
    </>
  );
}
