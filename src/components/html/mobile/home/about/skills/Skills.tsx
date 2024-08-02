import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./Skills.module.css";
import { Skill } from "@/types/skill";

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className={styles.skillContainer}>
      <h4>{skill.name}</h4>
      <p>{skill.description}</p>
      <div className={styles.skillItemContainer}>
        {skill.skillItem.map((item) => (
          <span key={item} className={styles.skillItem}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const skills = usePortfolioStore((state) => state.skillsData);

  if (skills.length > 0) {
    return (
      <div className={styles.container}>
        <span className={styles.sectionTitle}>Skills</span>
        <div className={styles.skillList}>
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      </div>
    );
  }
}
