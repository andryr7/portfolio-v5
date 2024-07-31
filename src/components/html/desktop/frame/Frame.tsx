import { Menu } from "./menu/Menu";
import styles from "./Frame.module.css";
import { Options } from "./options/Options";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Link, useRoute } from "wouter";

export function Frame() {
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );
  const [isHomepage] = useRoute("/");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.interfaceContainer}>
          <Options />
          {isHomepage && <Menu />}
          {!isHomepage && (
            <Link href="/" className={styles.homeLink}>
              back to homepage
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
    </>
  );
}
