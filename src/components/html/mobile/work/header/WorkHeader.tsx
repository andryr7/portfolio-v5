import { Work } from "@/types/work";
import styles from "./WorkHeader.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function WorkHeader({ work }: { work: Work }) {
  const lang = usePortfolioStore((state) => state.language);

  return (
    <header className={styles.header}>
      <div className={styles.infoBlock}>
        <span>{lang === "en" ? work?.enCaption : work?.frCaption}</span>
        <span
          style={{
            textAlign: "end",
          }}
        >
          {lang === "en" ? work?.enType : work?.frType}
        </span>
      </div>
      <div className={styles.titleBlock}>
        <h1>{work?.title}</h1>
        <span>{work?.year}</span>
      </div>
    </header>
  );
}
