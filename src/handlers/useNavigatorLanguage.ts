import { useEffect, useState } from "react";

export function useNavigatorLanguage() {
  const [navigatorLanguage, setNavigatorLanguage] = useState("en");

  //initial language handling
  useEffect(() => {
    const browserLanguage = navigator.language;
    const htmlElement = document.querySelector("html");

    if (browserLanguage === "fr" || browserLanguage === "fr-FR") {
      setNavigatorLanguage("fr");

      if (htmlElement !== null) {
        htmlElement.lang = "fr";
      }
    }
  }, []);

  return navigatorLanguage;
}
