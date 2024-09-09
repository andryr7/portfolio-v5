import { View } from "@react-three/drei";
import styles from "./Header.module.css";
import { HeaderScene } from "@/components/canvas/mobile/header/HeaderScene";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Header() {
  const lang = usePortfolioStore((state) => state.language);

  return (
    <header className={styles.container} id="header">
      <View className={styles.viewContainer}>
        <HeaderScene />
      </View>
      <div className={styles.titleContainer}>
        <h1>&nbsp;&nbsp;&nbsp;Andry</h1>
        <h1>&nbsp;&nbsp;Ratsimba</h1>
        <h2>independent</h2>
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;web</h2>
        <h2>&nbsp;developer</h2>
      </div>
      <span className={styles.tips}>
        {lang === "en" ? "scroll down" : "faites défiler"}
      </span>
    </header>
  );
}
