import { BrowserView } from "react-device-detect";
import { Menu } from "./menu/Menu";
import styles from "./Frame.module.css";
import { Options } from "./options/Options";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Frame() {
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );

  return (
    <>
      <BrowserView>
        <div className={styles.container}>
          <div className={styles.interfaceContainer}>
            <Options />
            <Menu />
          </div>
          <div
            className={styles.indicator}
            style={{ opacity: worksScrollProgress === 0 ? 1 : 0 }}
          >{`<- scroll or select ->`}</div>
        </div>
      </BrowserView>
    </>
  );
}
