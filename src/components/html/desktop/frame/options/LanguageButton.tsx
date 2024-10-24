import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./LanguageButton.module.css";

export function LanguageButton() {
  const lang = usePortfolioStore((state) => state.language);
  const setLanguage = usePortfolioStore((state) => state.setLanguage);

  const handleClick = () => {
    setLanguage(lang === "en" ? "fr" : "en");
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div
        className={`${styles.languageButton} ${
          lang === "en" ? styles.active : styles.inactive
        }`}
        style={{ transform: `translateY(${lang === "en" ? "-100%" : "0%"})` }}
      >
        fr
      </div>
      <div
        className={styles.languageButton}
        style={{ transform: `translateY(${lang === "en" ? "0%" : "100%"})` }}
      >
        en
      </div>
    </div>
  );
}
