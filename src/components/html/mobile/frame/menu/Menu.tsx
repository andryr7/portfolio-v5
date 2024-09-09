import { Link } from "wouter";
import { ThemeButton } from "../themebutton/ThemeButton";
import styles from "./Menu.module.css";
import { LanguageButton } from "@/components/html/desktop/frame/options/LanguageButton";
import { useTranslatedText } from "@/handlers/useTranslatedText";

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

  const worksLinkText = useTranslatedText("works", "projets");
  const aboutLinkText = useTranslatedText("about", "à propos");
  const contactLinkText = useTranslatedText("contact", "contact");
  const legalsLinkText = useTranslatedText("legals", "mentions légales");

  return (
    <div
      className={styles.menuContainer}
      style={{ opacity: menuIsOpened ? 1 : 0 }}
    >
      <div className={styles.menuTopContainer}>
        <div className={styles.optionsContainer}>
          <ThemeButton />
          <LanguageButton />
        </div>
        <MenuButton
          menuIsOpened={menuIsOpened}
          setMenuIsOpened={setMenuIsOpened}
        />
      </div>
      <div className={styles.menuCenterContainer}>
        <a onClick={() => handleSectionLinkClick("#works")}>{worksLinkText}</a>
        <a onClick={() => handleSectionLinkClick("#about")}>{aboutLinkText}</a>
        <a onClick={() => handleSectionLinkClick("#contact")}>
          {contactLinkText}
        </a>
      </div>
      <Link href="/legals" onClick={() => setMenuIsOpened(false)}>
        {legalsLinkText}
      </Link>
    </div>
  );
}
