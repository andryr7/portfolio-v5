import { Dispatch, SetStateAction, useState } from "react";
import styles from "./Skills.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Skill } from "@/types/skill";
import { useTranslatedText } from "@/handlers/useTranslatedText";

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
  const lang = usePortfolioStore((state) => state.language);

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
        {lang === "en" ? skill.enName : skill.frName}
      </div>
      <div
        className={styles.skillContentContainer}
        style={{ opacity: selected ? 1 : 0 }}
      >
        <h4>{lang === "en" ? skill.enName : skill.frName}</h4>
        {selected && (
          <p>{lang === "en" ? skill.enDescription : skill.frDescription}</p>
        )}
        {selected && (
          <div className={styles.skillItemContainer}>
            {skill.skillItem.map((item) => (
              <span key={item._key} className={styles.skillItem}>
                {lang === "en" ? item.enName : item.frName}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(0);
  const skills = usePortfolioStore((state) => state.skillsData);
  const sectionTitleText = useTranslatedText("Skills", "Compétences");
  const tipsText = useTranslatedText(
    "some of the things I can help you with",
    "ce pour quoi je peux vous aider"
  );

  if (skills.length > 0)
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{sectionTitleText}</h3>
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
        <span className={styles.tips}>{tipsText}</span>
      </div>
    );
}
