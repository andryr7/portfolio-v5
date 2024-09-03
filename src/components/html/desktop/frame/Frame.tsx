import { Menu } from "./menu/Menu";
import styles from "./Frame.module.css";
import { Link, useRoute } from "wouter";
import { ThemeButton } from "./options/ThemeButton";
import { LanguageButton } from "./options/LanguageButton";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Frame() {
  const [isHomepage] = useRoute("/");
  const lang = usePortfolioStore((state) => state.language);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.interfaceContainer}>
          <div className={styles.optionsContainer}>
            <ThemeButton />
            <LanguageButton />
          </div>
          {isHomepage && <Menu />}
          {!isHomepage && (
            <Link href="/" className={styles.homeLink}>
              {lang === "en" ? "back to homepage" : "retour à l'accueil"}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
