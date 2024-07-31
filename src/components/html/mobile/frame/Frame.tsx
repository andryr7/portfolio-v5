import styles from "./Frame.module.css";
import { useRoute } from "wouter";
import { Options } from "./options/Options";

export function Frame() {
  const [isHomepage] = useRoute("/");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.interfaceContainer}>
          <Options />
        </div>
      </div>
    </>
  );
}
