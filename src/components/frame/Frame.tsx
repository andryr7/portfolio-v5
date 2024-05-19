import { BrowserView, isMobile } from "react-device-detect";
import { Menu } from "./Menu";
import styles from "./Frame.module.css";

export function Frame() {
  return (
    <>
      <BrowserView>
        <div className={styles.container}>
          <div className={styles.interfaceContainer}>
            <div>options</div>
            <Menu />
          </div>
        </div>
      </BrowserView>
    </>
  );
}
