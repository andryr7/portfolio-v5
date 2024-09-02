import { Dispatch, SetStateAction, useState } from "react";
import styles from "./Skills.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Skill } from "@/types/skill";

function SkillCard({
  index,
  skill,
  selected,
  setSelectedSkill,
}: {
  index: number;
  skill: Skill;
  selected: boolean;
  setSelectedSkill: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div
      className={styles.skillContainer}
      style={{ width: selected ? "75%" : "12.5%" }}
      onClick={() => setSelectedSkill(index)}
    >
      <div
        className={styles.skillTitle}
        style={{ left: selected ? "-50%" : "50%" }}
      >
        {skill.name}
      </div>
      <div
        className={styles.skillContentContainer}
        style={{ opacity: selected ? 1 : 0 }}
      >
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
    </div>
  );
}

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(0);
  const skills = usePortfolioStore((state) => state.skillsData);

  if (skills.length > 0)
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Skills</h3>
        <div className={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <SkillCard
              key={skill._id}
              index={index}
              skill={skill}
              selected={selectedSkill === index}
              setSelectedSkill={setSelectedSkill}
            />
          ))}
        </div>
        <span className={styles.tips}>
          some of the things I can help you with
        </span>
      </div>
    );
}
