import { Work } from "@/types/work";
import styles from "./TechnologiesSection.module.css";
import { LinkButton } from "../LinkButton";

export function TechnologiesSection({ work }: { work: Work }) {
  return (
    <>
      <h2 className={styles.sectionTitle}>Technologies</h2>
      <div className={styles.techContainer}>techs</div>
      <div className={styles.infoContainer}>
        <div className={styles.linksContainer}>
          {work?.githubUrl && (
            <LinkButton url={work?.githubUrl} label={"github repo"} />
          )}
        </div>
        <p>{work?.technicalDescription}</p>
      </div>
    </>
  );
}
