import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { usePortfolioStore } from "./usePortfolioStore";

export function useLanguage() {
  //Checking browser language
  const [storedLanguagePreference, setStoredLanguagePreference] =
    useLocalStorage(
      "languagePreference",
      navigator.language === "fr" || navigator.language === "fr-FR"
        ? "fr"
        : "en"
    );

  //State methods
  const lang = usePortfolioStore((state) => state.language);
  const setLanguage = usePortfolioStore((state) => state.setLanguage);

  //Initial language sync
  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement == null) return;

    if (storedLanguagePreference === "fr") {
      setLanguage("fr");
      setStoredLanguagePreference("fr");
      htmlElement.lang = "fr";
    } else {
      setStoredLanguagePreference("en");
      htmlElement.lang = "en";
    }
  }, [setLanguage, storedLanguagePreference, setStoredLanguagePreference]);

  //Updated language sync
  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement == null) return;

    if (lang === "fr") {
      setStoredLanguagePreference("fr");
      htmlElement.lang = "fr";
    } else {
      setStoredLanguagePreference("en");
      htmlElement.lang = "en";
    }
  }, [lang, setStoredLanguagePreference]);
}
