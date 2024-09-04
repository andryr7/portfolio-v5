import { useEffect, useState } from "react";
import { usePortfolioStore } from "./usePortfolioStore";
import { useAnimatedText } from "./useAnimatedText";

export function useTranslatedText(enText: string, frText: string) {
  const lang = usePortfolioStore((state) => state.language);
  const [currentText, setCurrentText] = useState("");
  const [text] = useAnimatedText(currentText);

  useEffect(() => {
    setCurrentText(lang === "en" ? enText : frText);
  }, [lang, enText, frText]);

  return text;
}
