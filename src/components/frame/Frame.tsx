import { BrowserView, isMobile } from "react-device-detect";
import { MenuButton } from "./MenuButton";
import styles from "./Frame.module.css";

export function Frame() {
  return (
    <>
      <BrowserView>
        <div className={styles.container}>
          <div className={styles.interfaceContainer}>
            <div>options</div>
            <MenuButton />
          </div>
        </div>
      </BrowserView>
    </>
  );
}
