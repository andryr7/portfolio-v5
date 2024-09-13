import { Work } from "@/types/work";
import styles from "./WorkFooter.module.css";
import { Link } from "wouter";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useLenis } from "lenis/react";
import { Footer } from "../../footer/Footer";
import Lenis from "lenis";
import { useTranslatedText } from "@/handlers/useTranslatedText";

export function WorkFooter({
  work,
  globalLenisInstance,
}: {
  work: Work;
  globalLenisInstance: Lenis | undefined;
}) {
  const lenis = useLenis();
  const worksData = usePortfolioStore((state) => state.worksData);
  const returnText = useTranslatedText(
    "back to works list",
    "retour aux projets"
  );
  const nextProjectText = useTranslatedText(
    "next project : ",
    "projet suivant : "
  );

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
            <span>{returnText}</span>
          </Link>
          <Link
            href="/"
            className={styles.footerButton}
            onClick={() => globalLenisInstance?.scrollTo("#contact")}
          >
            <span>contact</span>
          </Link>
          <Link
            href={`/work/${nextProject.slug.current}`}
            className={styles.footerButton}
            onClick={() => lenis?.scrollTo(0)}
          >
            <span>
              {nextProjectText}
              {nextProject.title}
            </span>
          </Link>
        </div>
      </div>
      <footer className={styles.footerContainer}>
        <Footer />
      </footer>
    </>
  );
}
