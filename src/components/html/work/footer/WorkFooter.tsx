import { Work } from "@/types/work";
import { Footer } from "../../home/footer/Footer";
import styles from "./WorkFooter.module.css";
import { Link } from "wouter";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useLenis } from "lenis/react";

export function WorkFooter({ work }: { work: Work }) {
  const lenis = useLenis();
  const worksData = usePortfolioStore((state) => state.worksData);

  const pos = worksData.map((w) => w._id).indexOf(work._id);
  const nextProject =
    pos === worksData.length - 1 ? worksData[0] : worksData[pos + 1];

  return (
    <>
      <div style={{ backgroundColor: "var(--color-main)" }}>
        <div className={styles.footerLinksContainer}>
          <Link
            href="/"
            className={styles.footerButton}
            style={{ borderLeft: "none" }}
            onClick={() => lenis?.scrollTo(0)}
          >
            back to homepage
          </Link>
          <Link href="/" className={styles.footerButton}>
            contact
          </Link>
          <Link
            href={`/work/${nextProject.slug.current}`}
            className={styles.footerButton}
            onClick={() => lenis?.scrollTo(0)}
          >
            next project: {nextProject.title}
          </Link>
        </div>
      </div>
      <footer className={styles.footerContainer}>
        <Footer />
      </footer>
    </>
  );
}
