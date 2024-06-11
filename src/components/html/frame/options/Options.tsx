import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./Options.module.css";

function ThemeButton() {
  const { isDarkTheme } = usePortfolioStore((state) => ({
    isDarkTheme: state.isDarkTheme,
  }));
  const { setIsDarkTheme } = usePortfolioStore((state) => ({
    setIsDarkTheme: state.setIsDarkTheme,
  }));

  const handleClick = () => {
    setIsDarkTheme(isDarkTheme ? false : true);
  };

  return (
    <div className={styles.buttonContainer} onClick={handleClick}>
      dark
    </div>
  );
}

function LanguageButton() {
  return <div className={styles.buttonContainer}>lang</div>;
}

export function Options() {
  return (
    <div className={styles.container}>
      <ThemeButton />
      <LanguageButton />
    </div>
  );
}
