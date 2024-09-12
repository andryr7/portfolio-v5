import { PerspectiveCamera, View } from "@react-three/drei";
import styles from "./Contact.module.css";
import { Tesseract } from "@/components/canvas/desktop/contact/Tesseract";

export function Contact() {
  return (
    <div className={styles.container} id="contact">
      <View className={styles.viewContainer}>
        <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={45} />
        <Tesseract active={true} visible={true} scale={1 / 275} />
      </View>
      <div className={styles.linkContainer}>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="mailto:contact@andryratsimba.com"
        >
          {"-> email"}
        </a>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.linkedin.com/in/andryratsimba/"
        >
          {"-> linkedIn"}
        </a>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/andryr7"
        >
          {"-> gitHub"}
        </a>
      </div>
    </div>
  );
}
