import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { Link } from "wouter";

export function WorksSection() {
  const worksData = usePortfolioStore((state) => state.worksData);

  return (
    <div className={styles.container}>
      <span className={styles.sectionTitle}>selected works</span>
      <div className={styles.workList}>
        {worksData.map((work) => (
          <Link
            href={`/work/${work.slug.current}`}
            className={styles.workContainer}
          >
            <img
              src={"/images/works/" + work.previewImagePath}
              className={styles.workPreviewImage}
              loading="eager"
              alt={`${work.title} - image`}
            />
            <span>{work.caption}</span>
            <h3>{"-> " + work.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
