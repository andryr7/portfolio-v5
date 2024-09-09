import { View } from "@react-three/drei";
import styles from "./Header.module.css";
import { HeaderScene } from "@/components/canvas/mobile/header/HeaderScene";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Header() {
  const lang = usePortfolioStore((state) => state.language);

  const handleArrowClick = () => {
    document
      .querySelector("#works")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={styles.container} id="header">
      <View className={styles.viewContainer}>
        <HeaderScene />
      </View>
      <div className={styles.topContainer}>
        <span>protfolio v5</span>
      </div>
      <div className={styles.titleContainer}>
        <h1>Andry</h1>
        <h1>Ratsimba</h1>
        <h2>{lang === "en" ? "independent" : "développeur"}</h2>
        <h2>{lang === "en" ? "developer" : "indépendant"}</h2>
      </div>
      <div className={styles.bottomContainer}>
        <span>{lang === "en" ? "welcome" : "bienvenue"}</span>
        <div className={styles.arrowButton} onClick={handleArrowClick}>
          {"->"}
        </div>
      </div>
    </header>
  );
}
