import { Skill, SkillItem as SkillItemType } from "@/types/skill";
import styles from "./SkillCard.module.css";
import { useTranslatedText } from "@/handlers/useTranslatedText";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

function SkillItem({ item }: { item: SkillItemType }) {
  const lang = usePortfolioStore((state) => state.language);

  return (
    <div className={styles.skillItemContainer}>
      {lang === "en" ? item.enName : item.frName}
    </div>
  );
}

export function SkillCard({
  skill,
  active,
}: {
  skill: Skill;
  active: boolean;
}) {
  const lang = usePortfolioStore((state) => state.language);
  const skillTitleText = useTranslatedText(skill.enName, skill.frName);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3
          style={{
            opacity: active ? 1 : 0.5,
          }}
        >
          {skillTitleText}
        </h3>
      </div>
      <p className={styles.contentContainer}>
        {lang === "en" ? skill.enDescription : skill.frDescription}
      </p>
      <div className={styles.itemsContainer}>
        {skill.skillItem.map((item) => (
          <SkillItem key={item._key} item={item} />
        ))}
      </div>
    </div>
  );
}
