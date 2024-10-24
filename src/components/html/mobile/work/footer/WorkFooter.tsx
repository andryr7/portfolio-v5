import { Work } from "@/types/workTypes";
import styles from "./WorkFooter.module.css";
import { Link, useLocation } from "wouter";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useEffect } from "react";

export function WorkFooter({ work }: { work: Work }) {
  const lang = usePortfolioStore((state) => state.language);
  const worksData = usePortfolioStore((state) => state.worksData);

  const pos = worksData.map((w) => w._id).indexOf(work._id);
  const nextProject =
    pos === worksData.length - 1 ? worksData[0] : worksData[pos + 1];

  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  return (
    <>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.footerButton}
          // onClick={() => globalLenisInstance?.scrollTo("#contact")}
        >
          {lang === "en" ? "back to homepage" : "retour à l'accueil"}
        </Link>
        <Link
          href={`/work/${nextProject.slug.current}`}
          className={styles.footerButton}
        >
          {lang === "en" ? "next project" : "project suivant"}:
          <br />
          {nextProject.title}
        </Link>
      </div>
    </>
  );
}
