import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./LanguageButton.module.css";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useNavigatorLanguage } from "@/handlers/useNavigatorLanguage";

export function LanguageButton() {
  const lang = usePortfolioStore((state) => state.language);
  const setLanguage = usePortfolioStore((state) => state.setLanguage);
  const navigatorLanguage = useNavigatorLanguage();
  const [storedLanguagePreference, setStoredLanguagePreference] =
    useLocalStorage("languagePreference", "default");

  //Language initial setting and change handling
  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (storedLanguagePreference !== "default") {
      //If a language preference was chosen, use it
      setLanguage(storedLanguagePreference);
      if (htmlElement !== null) {
        htmlElement.lang = storedLanguagePreference;
      }
    } else {
      //If no language preference was set, get preference from navigator
      if (navigatorLanguage === "fr") {
        setLanguage("fr");
        if (htmlElement !== null) {
          htmlElement.lang = "fr";
        }
      }
    }
  }, [navigatorLanguage, setLanguage, storedLanguagePreference]);

  const handleClick = () => {
    setStoredLanguagePreference(lang === "en" ? "fr" : "en");
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.languageButton}>{lang === "en" ? "en" : "fr"}</div>
      <div className={styles.languageButton}>{lang === "en" ? "fr" : "en"}</div>
    </div>
  );
}
