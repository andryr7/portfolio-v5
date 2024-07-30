import { BrowserView } from "react-device-detect";
import { Menu } from "./menu/Menu";
import styles from "./Frame.module.css";
import { Options } from "./options/Options";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Link, useRoute } from "wouter";
import { useLenis } from "lenis/react";

export function Frame() {
  const lenis = useLenis();
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );
  const [isHomepage] = useRoute("/");

  return (
    <>
      <BrowserView>
        <div className={styles.container}>
          <div className={styles.interfaceContainer}>
            <Options />
            {isHomepage && <Menu />}
            {!isHomepage && (
              <Link
                href="/"
                className={styles.homeLink}
                onClick={() => lenis?.scrollTo("#works")}
              >
                Back to homepage
              </Link>
            )}
          </div>
          {isHomepage && (
            <div
              className={styles.indicator}
              style={{ opacity: worksScrollProgress === 0 ? 1 : 0 }}
            >{`<- scroll or select ->`}</div>
          )}
        </div>
      </BrowserView>
    </>
  );
}
