import { Work } from "@/types/work";
import styles from "./WorkHeader.module.css";

export function WorkHeader({ work }: { work: Work }) {
  return (
    <header className={styles.header}>
      <div />
      <div className={styles.infoBlock}>
        <span>{work?.caption}</span>
        <span>{work?.type}</span>
      </div>
      <div className={styles.titleBlock}>
        <h1>{work?.title}</h1>
        <span>{work?.year}</span>
      </div>
    </header>
  );
}
