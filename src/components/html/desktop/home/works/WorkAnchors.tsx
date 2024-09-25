import styles from "./WorkAnchors.module.css";

export function WorkAnchors() {
  return (
    <>
      <a id="firstWorkAnchor" className={styles.anchor} />
      <a id="secondWorkAnchor" className={styles.anchor} />
      <a id="thirdWorkAnchor" className={styles.anchor} />
      <a id="fourthWorkAnchor" className={styles.anchor} />
    </>
  );
}
