import { Work } from "@/types/workTypes";
import styles from "./WorkHeader.module.css";
import { useTranslatedText } from "@/handlers/useTranslatedText";

export function WorkHeader({ work }: { work: Work }) {
  const captionText = useTranslatedText(work.enCaption, work.frCaption);
  const typeText = useTranslatedText(work.enType, work.frType);

  return (
    <header className={styles.header}>
      <div className={styles.infoBlock}>
        <span>{captionText}</span>
        <span
          style={{
            textAlign: "end",
          }}
        >
          {typeText}
        </span>
      </div>
      <div className={styles.titleBlock}>
        <h1>{work?.title}</h1>
        <span>{work?.year}</span>
      </div>
    </header>
  );
}
