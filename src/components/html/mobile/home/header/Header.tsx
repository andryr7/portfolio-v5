import { View } from "@react-three/drei";
import styles from "./Header.module.css";
import { HeaderScene } from "@/components/canvas/mobile/header/HeaderScene";

export function Header() {
  return (
    <header className={styles.container}>
      <View className={styles.viewContainer}>
        <HeaderScene />
      </View>
      <div className={styles.titleContainer}>
        <h1>
          Andry
          <br />
          Ratsimba
        </h1>
        <h2>
          independent
          <br />
          web developer
        </h2>
      </div>
    </header>
  );
}
