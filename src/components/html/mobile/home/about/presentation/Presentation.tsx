import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./Presentation.module.css";

export function Presentation() {
  const generalInfoData = usePortfolioStore((state) => state.generalInfoData);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2>Hello there</h2>
        <p>{generalInfoData.presentationText}</p>
      </div>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url('/images/about/me.jpg')` }}
      />
    </div>
  );
}
