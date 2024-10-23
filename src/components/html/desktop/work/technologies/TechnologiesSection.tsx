import { Work } from "@/types/work";
import styles from "./TechnologiesSection.module.css";
import { LinkButton } from "../LinkButton";

//Splide slider imports
import { TechItem } from "./TechItem";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function TechnologiesSection({ work }: { work: Work }) {
  const lang = usePortfolioStore((state) => state.language);

  return (
    <>
      <h2 className={styles.sectionTitle}>Technologies</h2>
      <div className={styles.techContainer}>
        {work?.usedTechs?.map((tech) => (
          <TechItem key={tech._id} item={tech} />
        ))}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.linksContainer}>
          {work?.githubUrl && (
            <LinkButton url={work?.githubUrl} label={"gitHub"} />
          )}
        </div>
        <p>
          {lang === "en"
            ? work?.enTechnicalDescription
            : work?.frTechnicalDescription}
        </p>
      </div>
    </>
  );
}
