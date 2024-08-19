import { Menu } from "./menu/Menu";
import styles from "./Frame.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Link, useRoute } from "wouter";
import { ThemeButton } from "./options/ThemeButton";

export function Frame() {
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );
  const [isHomepage] = useRoute("/");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.interfaceContainer}>
          <div className={styles.optionsContainer}>
            <ThemeButton />
            {/* <LanguageButton /> */}
          </div>
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
