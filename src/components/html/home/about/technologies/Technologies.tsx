import { View } from "@react-three/drei";
import styles from "./Technologies.module.css";
import { TechnologiesScene } from "@/components/canvas/home/technologies/TechnologiesScene";

export function Technologies() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>What I do</h3>
      <View className={styles.view}>
        <TechnologiesScene />
      </View>
    </div>
  );
}
