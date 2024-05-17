import { BrowserView, isMobile } from "react-device-detect";
import { MenuButton } from "./MenuButton";
import styles from "./Frame.module.css";

export function Frame() {
  return (
    <>
      <BrowserView>
        <div className={styles.container}>
          <MenuButton />
        </div>
      </BrowserView>
    </>
  );
}
