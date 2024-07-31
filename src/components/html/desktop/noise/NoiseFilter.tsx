import styles from "./NoiseFilter.module.css";
import noise from "@/assets/noise.png";
import darknoise from "@/assets/darknoise.png";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export default function NoiseFilter({ opacity = 1 }: { opacity?: number }) {
  const isDarkTheme = usePortfolioStore((state) => state.isDarkTheme);

  return (
    <div
      className={styles.noiseFilter}
      style={{
        backgroundImage: `url(${isDarkTheme ? darknoise : noise})`,
        opacity: opacity,
      }}
    />
  );
}
