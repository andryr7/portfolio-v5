import { useEffect, useState } from "react";

export function useNavigatorLanguage() {
  const [navigatorLanguage, setNavigatorLanguage] = useState("en");

  //initial language handling
  useEffect(() => {
    const browserLanguage = navigator.language;

    if (browserLanguage === "fr" || browserLanguage === "fr-FR") {
      setNavigatorLanguage("fr");
    }
  }, []);

  return navigatorLanguage;
}
