import { Work } from "@/types/work";
import styles from "./WorkFooter.module.css";
import { Link } from "wouter";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useLenis } from "lenis/react";
import { Footer } from "../../footer/Footer";
import Lenis from "lenis";

export function WorkFooter({
  work,
  globalLenisInstance,
}: {
  work: Work;
  globalLenisInstance: Lenis | undefined;
}) {
  const lenis = useLenis();
  const worksData = usePortfolioStore((state) => state.worksData);
  const lang = usePortfolioStore((state) => state.language);

  const pos = worksData.map((w) => w._id).indexOf(work._id);
  const nextProject =
    pos === worksData.length - 1 ? worksData[0] : worksData[pos + 1];

  return (
    <>
      <div
        style={{
          backgroundColor: "var(--color-main)",
        }}
      >
        <div className={styles.footerLinksContainer}>
          <Link
            href="/"
            className={styles.footerButton}
            style={{ borderLeft: "none" }}
            onClick={() => globalLenisInstance?.scrollTo("#works")}
          >
            {lang === "en" ? "back to works list" : "retour vers les projets"}
          </Link>
          <Link
            href="/"
            className={styles.footerButton}
            onClick={() => globalLenisInstance?.scrollTo("#contact")}
          >
            contact
          </Link>
          <Link
            href={`/work/${nextProject.slug.current}`}
            className={styles.footerButton}
            onClick={() => lenis?.scrollTo(0)}
          >
            {lang === "en" ? "next project : " : "projet suivant : "}
            {nextProject.title}
          </Link>
        </div>
      </div>
      <footer className={styles.footerContainer}>
        <Footer />
      </footer>
    </>
  );
}
