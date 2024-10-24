import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./ThemeButton.module.css";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { useEffect } from "react";

export function ThemeButton() {
  const isDarkTheme = usePortfolioStore((state) => state.isDarkTheme);
  const setIsDarkTheme = usePortfolioStore((state) => state.setIsDarkTheme);
  const browserPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [storedThemePreference, setStoredThemePreference] = useLocalStorage(
    "themePreference",
    browserPrefersDark ? "dark" : "light"
  );

  const handleClick = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setIsDarkTheme(newTheme === "dark" ? true : false);
    setStoredThemePreference(newTheme);
  };

  useEffect(() => {
    storedThemePreference === "dark" && setIsDarkTheme(true);
  }, [setIsDarkTheme, storedThemePreference]);

  return <div className={styles.darkModeButton} onClick={handleClick} />;
}
