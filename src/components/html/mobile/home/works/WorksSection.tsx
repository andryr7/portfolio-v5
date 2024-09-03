import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { Link } from "wouter";

export function WorksSection() {
  const worksData = usePortfolioStore((state) => state.worksData);
  const lang = usePortfolioStore((state) => state.language);

  return (
    <div className={styles.container} id="works">
      <span className={styles.sectionTitle}>
        {lang === "en" ? "selected works" : "projets"}
      </span>
      <div className={styles.workList}>
        {worksData.map((work) => (
          <Link
            href={`/work/${work.slug.current}`}
            className={styles.workContainer}
            key={work._id}
          >
            <img
              src={"/images/works/" + work.previewImagePath}
              className={styles.workPreviewImage}
              loading="eager"
              alt={`${work.title} - image`}
            />
            <span>{lang === "en" ? work.enCaption : work.frCaption}</span>
            <h3>{"-> " + work.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
