import { Link } from "wouter";
import { ThemeButton } from "../themebutton/ThemeButton";
import styles from "./Menu.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { LanguageButton } from "@/components/html/desktop/frame/options/LanguageButton";

export function MenuButton({
  menuIsOpened,
  setMenuIsOpened,
}: {
  menuIsOpened: boolean;
  setMenuIsOpened: (newStatus: any) => void;
}) {
  return (
    <div
      onClick={() => setMenuIsOpened((c: boolean) => !c)}
      className={styles.menuButton}
    >
      {menuIsOpened && <div className={styles.closedMenuBar} />}
      {!menuIsOpened && <div className={styles.openedMenuBar} />}
    </div>
  );
}

export function Menu({
  menuIsOpened,
  setMenuIsOpened,
}: {
  menuIsOpened: boolean;
  setMenuIsOpened: (newStatus: any) => void;
}) {
  const handleSectionLinkClick = (target: string) => {
    setMenuIsOpened(false);
    document
      .querySelector(target)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const lang = usePortfolioStore((state) => state.language);

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuTopContainer}>
        <ThemeButton />
        <LanguageButton />
        <MenuButton
          menuIsOpened={menuIsOpened}
          setMenuIsOpened={setMenuIsOpened}
        />
      </div>
      <div className={styles.menuCenterContainer}>
        <a onClick={() => handleSectionLinkClick("#works")}>
          {lang === "en" ? "works" : "projets"}
        </a>
        <a onClick={() => handleSectionLinkClick("#about")}>
          {lang === "en" ? "about" : "à propos"}
        </a>
        <a onClick={() => handleSectionLinkClick("#contact")}>contact</a>
      </div>
      <Link href="/legals" onClick={() => setMenuIsOpened(false)}>
        legals
      </Link>
    </div>
  );
}
