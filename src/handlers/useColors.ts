import { useEffect, useState } from "react";
import { usePortfolioStore } from "./usePortfolioStore";
import { useShallow } from "zustand/react/shallow";

export function useColors() {
  const [colors, setColors] = useState({
    main: "#000000",
    accent: "#000000",
    backgroundOne: "#000000",
    backgroundTwo: "#000000",
  });

  const { isDarkTheme } = usePortfolioStore(
    useShallow((state) => ({ isDarkTheme: state.isDarkTheme }))
  );

  //Handling initial state
  useEffect(() => {
    const style = getComputedStyle(document.body);
    setColors({
      main: style.getPropertyValue("--color-main"),
      accent: style.getPropertyValue("--color-accent"),
      backgroundOne: style.getPropertyValue("--color-background-one"),
      backgroundTwo: style.getPropertyValue("--color-background-two"),
    });
  }, [isDarkTheme]);

  return colors;
}
