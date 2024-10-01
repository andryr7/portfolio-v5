import styles from "./SkillAnchors.module.css";

export function SkillAnchors() {
  return (
    <>
      <a id="firstSkillAnchor" className={styles.anchor} />
      <a id="secondSkillAnchor" className={styles.anchor} />
      <a id="thirdSkillAnchor" className={styles.anchor} />
    </>
  );
}
