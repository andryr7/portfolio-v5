import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./Skills.module.css";
import { Skill } from "@/types/skillTypes";

function SkillCard({ skill }: { skill: Skill }) {
  const lang = usePortfolioStore((state) => state.language);

  return (
    <div className={styles.skillContainer}>
      <h4>{lang === "en" ? skill.enName : skill.frName}</h4>
      <p>{lang === "en" ? skill.enDescription : skill.frDescription}</p>
      <div className={styles.skillItemContainer}>
        {skill.skillItem.map((item) => (
          <span key={item._key} className={styles.skillItem}>
            {lang === "en" ? item.enName : item.frName}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const skills = usePortfolioStore((state) => state.skillsData);
  const lang = usePortfolioStore((state) => state.language);

  if (skills.length > 0) {
    return (
      <div className={styles.container}>
        <span className={styles.sectionTitle}>
          {lang === "en" ? "Skills" : "Compétences"}
        </span>
        <div className={styles.skillList}>
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      </div>
    );
  }
}
