import { useCallback, useEffect } from "react";
import { usePortfolioStore } from "./usePortfolioStore";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

export const lightColors = {
  main: "#0e0e0e",
  accent: "#FF6A00",
  backgroundOne: "#e9e9e9",
  backgroundTwo: "#d9d9d9",
};

const darkColors = {
  main: "#d9d9d9",
  accent: "#FF6A00",
  backgroundOne: "#0e0e0e",
  backgroundTwo: "#2c2c2c",
};

//Custom hook that stores colors in state and local storage and triggers css color changes
export function useTheme() {
  //Checking and storing browser preference
  const browserPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [storedThemePreference, setStoredThemePreference] = useLocalStorage(
    "themePreference",
    browserPrefersDark ? "dark" : "light"
  );

  //Context state methods
  const setColors = usePortfolioStore((state) => state.setColors);
  const isDarkTheme = usePortfolioStore((state) => state.isDarkTheme);
  const setIsDarkTheme = usePortfolioStore((state) => state.setIsDarkTheme);

  const setCSSColors = useCallback((theme: "dark" | "light") => {
    if (theme === "dark") {
      !document.body.classList.contains("dark") &&
        document.body.classList.add("dark");
    } else if (theme === "light") {
      document.body.classList.contains("dark") &&
        document.body.classList.remove("dark");
    }
  }, []);

  //Initial theme sync
  useEffect(() => {
    if (storedThemePreference === "light") {
      setIsDarkTheme(false);
      setStoredThemePreference("light");
      setColors(lightColors);
      setCSSColors("light");
    } else {
      setStoredThemePreference("dark");
      setColors(darkColors);
      setCSSColors("dark");
    }
  }, [
    setStoredThemePreference,
    storedThemePreference,
    setIsDarkTheme,
    setCSSColors,
    setColors,
  ]);

  //Updated theme sync
  useEffect(() => {
    if (!isDarkTheme) {
      setStoredThemePreference("light");
      setColors(lightColors);
      setCSSColors("light");
    } else {
      setStoredThemePreference("dark");
      setColors(darkColors);
      setCSSColors("dark");
    }
  }, [isDarkTheme, setStoredThemePreference, setCSSColors, setColors]);
}
