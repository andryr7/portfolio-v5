import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./LanguageButton.module.css";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useNavigatorLanguage } from "@/handlers/useNavigatorLanguage";

export function LanguageButton() {
  const language = usePortfolioStore((state) => state.language);
  const setLanguage = usePortfolioStore((state) => state.setLanguage);
  const navigatorLanguage = useNavigatorLanguage();
  const [storedLanguagePreference, setStoredLanguagePreference] =
    useLocalStorage("languagePreference", navigatorLanguage);

  //initial language handling
  useEffect(() => {
    if (storedLanguagePreference === "fr") {
      setStoredLanguagePreference("fr");
      setLanguage("fr");
      const htmlElement = document.querySelector("html");
      if (htmlElement !== null) {
        htmlElement.lang = "fr";
      }
    } else {
      setStoredLanguagePreference("en");
    }
  }, [setLanguage, storedLanguagePreference, setStoredLanguagePreference]);

  const handleClick = () => {
    setLanguage(language === "en" ? "fr" : "en");
    setStoredLanguagePreference(language === "en" ? "fr" : "en");
  };

  return (
    <div className={styles.languageButton} onClick={handleClick}>
      {language}
    </div>
  );
}
