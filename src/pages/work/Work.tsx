import { Link, useRoute } from "wouter";
import styles from "./Work.module.css";

export function Work() {
  const [match, params] = useRoute("/work/:workname");

  return (
    <>
      <header className={styles.placeholder}>
        Project Name
        <Link href="/">Test link</Link>
      </header>
      <main>
        <section className={styles.placeholder}>
          Project name - section 1<Link href="/">Test link</Link>
        </section>
        <section className={styles.placeholder}>
          Project name - section 2<Link href="/">Test link</Link>
        </section>
      </main>
      <footer className={styles.placeholder} style={{ height: "50vh" }}>
        Footer
        <Link href="/">Test link</Link>
      </footer>
    </>
  );
}
