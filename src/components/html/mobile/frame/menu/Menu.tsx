import { Link } from "wouter";
import { ThemeButton } from "../themebutton/ThemeButton";
import styles from "./Menu.module.css";

export function MenuButton({
  setMenuIsOpened,
}: {
  setMenuIsOpened: (newStatus: any) => void;
}) {
  return (
    <div
      onClick={() => setMenuIsOpened((c) => !c)}
      className={styles.menuButton}
    >
      menu
    </div>
  );
}

export function Menu({
  setMenuIsOpened,
}: {
  setMenuIsOpened: (newStatus: any) => void;
}) {
  const handleSectionLinkClick = (target: string) => {
    setMenuIsOpened(false);
    document
      .querySelector(target)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuTopContainer}>
        <ThemeButton />
        <MenuButton setMenuIsOpened={setMenuIsOpened} />
      </div>
      <div className={styles.menuCenterContainer}>
        <a onClick={() => handleSectionLinkClick("#works")}>works</a>
        <a onClick={() => handleSectionLinkClick("#about")}>about</a>
        <a onClick={() => handleSectionLinkClick("#contact")}>contact</a>
      </div>
      <Link href="/legals" onClick={() => setMenuIsOpened(false)}>
        legals
      </Link>
    </div>
  );
}
