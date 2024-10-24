import { SkillsScene } from "@/components/canvas/desktop/skills/SkillsScene";
import styles from "./Skills.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useTranslatedText } from "@/handlers/useTranslatedText";
import { PerspectiveCamera, View } from "@react-three/drei";
import { SkillCard } from "./SkillCard";

export function Skills() {
  const skills = usePortfolioStore((state) => state.skillsData);
  const sectionTitleText = useTranslatedText("Skills", "Compétences");

  const skillsScrollProgress = usePortfolioStore(
    (state) => state.skillsScrollProgress
  );

  return (
    <>
      <div className={styles.pageContainer} id="skills-pinned">
        <div className={styles.sectionContainer}>
          <h3 className={styles.title}>{sectionTitleText}</h3>
          <div className={styles.mainContainer}>
            <View className={styles.viewContainer}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={10} />
              <SkillsScene />
            </View>
            <div className={styles.cardsContainer}>
              <div className={styles.cardContainer}>
                <SkillCard
                  skill={skills[0]}
                  active={skillsScrollProgress <= 0.33}
                  targetAnchorId="#firstSkillAnchor"
                />
              </div>
              <div
                className={styles.cardContainer}
                //Adjust this for scroll steps
                style={{
                  transform: `translateY(${
                    skillsScrollProgress >= 0.33 ? 0 : 100
                  }%)`,
                }}
              >
                <SkillCard
                  skill={skills[1]}
                  active={
                    skillsScrollProgress > 0.33 && skillsScrollProgress < 0.66
                  }
                  targetAnchorId="#secondSkillAnchor"
                />
              </div>
              <div
                className={styles.cardContainer}
                //Adjust this for scroll steps
                style={{
                  transform: `translateY(${
                    skillsScrollProgress >= 0.66 ? 0 : 100
                  }%)`,
                }}
              >
                <SkillCard
                  skill={skills[2]}
                  active={skillsScrollProgress >= 0.66}
                  targetAnchorId="#thirdSkillAnchor"
                />
              </div>
            </div>
            <div className={styles.scrollIndicator}>
              <div
                className={styles.scrollProgressBar}
                style={{ top: `${skillsScrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
