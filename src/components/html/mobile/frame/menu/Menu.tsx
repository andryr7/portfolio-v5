import { Link } from "wouter";
import { ThemeButton } from "../themebutton/ThemeButton";
import styles from "./Menu.module.css";

export function MenuButton({
  menuIsOpened,
  setMenuIsOpened,
}: {
  menuIsOpened: boolean;
  setMenuIsOpened: (newStatus: any) => void;
}) {
  return (
    <div
      onClick={() => setMenuIsOpened((c) => !c)}
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

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuTopContainer}>
        <ThemeButton />
        <MenuButton
          menuIsOpened={menuIsOpened}
          setMenuIsOpened={setMenuIsOpened}
        />
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
