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
  const [match] = useRoute("/");

  return (
    <>
      <BrowserView>
        <div className={styles.container}>
          <div className={styles.interfaceContainer}>
            <Options />
            {match && <Menu />}
            {!match && (
              <Link
                href="/"
                className={styles.homeLink}
                onClick={() => lenis?.scrollTo(0)}
              >
                Back to homepage
              </Link>
            )}
          </div>
          {match && (
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
