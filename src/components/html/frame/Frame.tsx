import { BrowserView, isMobile } from "react-device-detect";
import { Menu } from "./menu/Menu";
import styles from "./Frame.module.css";
import { Options } from "./options/Options";

export function Frame() {
  return (
    <>
      <BrowserView>
        <div className={styles.container}>
          <div className={styles.interfaceContainer}>
            <Options />
            <Menu />
          </div>
        </div>
      </BrowserView>
    </>
  );
}
