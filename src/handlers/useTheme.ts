import { useCallback, useEffect } from "react";
import { usePortfolioStore } from "./usePortfolioStore";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

export function useTheme() {
  const isDarkTheme = usePortfolioStore((state) => state.isDarkTheme);
  const setIsDarkTheme = usePortfolioStore((state) => state.setIsDarkTheme);
  const setColors = usePortfolioStore((state) => state.setColors);
  const browserPreference = useMediaQuery("(prefers-color-scheme: dark)");
  const [storedThemePreference, setStoredThemePreference] = useLocalStorage(
    "themePreference",
    browserPreference ? "dark" : "light"
  );

  //Handling initial stored and browser preference
  useEffect(() => {
    if (storedThemePreference === "dark") {
      setIsDarkTheme(true);
    }
  }, [storedThemePreference, setIsDarkTheme]);

  // Handling css and local storage modifications
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
      setStoredThemePreference(() => "dark");
    } else {
      document.body.classList.remove("dark");
      setStoredThemePreference(() => "light");
    }
  }, [isDarkTheme, setStoredThemePreference]);

  const updateColors = useCallback(() => {
    const style = getComputedStyle(document.body);
    setColors({
      main: style.getPropertyValue("--color-main"),
      accent: style.getPropertyValue("--color-accent"),
      backgroundOne: style.getPropertyValue("--color-background-one"),
      backgroundTwo: style.getPropertyValue("--color-background-two"),
    });
  }, [setColors]);

  //Handling color storage
  useEffect(() => {
    updateColors();
  }, [isDarkTheme, setColors, updateColors]);

  useEffect(() => {
    updateColors();
  }, [updateColors]);

  return { isDarkTheme, setIsDarkTheme };
}
