import { useCallback, useEffect } from "react";
import { usePortfolioStore } from "./usePortfolioStore";

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

export function useTheme() {
  const setColors = usePortfolioStore((state) => state.setColors);
  const isDarkTheme = usePortfolioStore((state) => state.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  const updateStateColors = useCallback(
    (theme: "dark" | "light") => {
      setColors(theme === "dark" ? darkColors : lightColors);
    },
    [setColors]
  );

  const updateCssColors = (theme: "dark" | "light") => {
    if (theme === "dark") {
      !document.body.classList.contains("dark") &&
        document.body.classList.add("dark");
    } else if (theme === "light") {
      document.body.classList.contains("dark") &&
        document.body.classList.remove("dark");
    }
  };

  useEffect(() => {
    updateStateColors(theme);
    updateCssColors(theme);
  }, [theme, updateStateColors]);
}
