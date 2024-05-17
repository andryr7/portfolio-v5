import { useEffect } from "react";
import { usePortfolioStore } from "./usePortfolioStore";
import { useMediaQuery } from "usehooks-ts";

export function useTheme() {
  const isDarkTheme = usePortfolioStore((state) => state.isDarkTheme);
  const setIsDarkTheme = usePortfolioStore((state) => state.setIsDarkTheme);
  const userPrefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");

  //Handling user browser preferences
  useEffect(() => {
    if (userPrefersDarkTheme) {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }
  }, [userPrefersDarkTheme, setIsDarkTheme]);

  //Handling css modifications
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return { isDarkTheme, setIsDarkTheme };
}
