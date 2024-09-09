import { useTranslatedText } from "@/handlers/useTranslatedText";
import styles from "./MobileMenu.module.css";
import { Link } from "wouter";
import { ThemeButton } from "../themebutton/ThemeButton";
import { LanguageButton } from "@/components/html/desktop/frame/options/LanguageButton";

export function MobileMenu({
  setMenuIsOpened,
}: {
  setMenuIsOpened: (status: boolean) => void;
}) {
  const worksLinkText = useTranslatedText("works", "projets");
  const aboutLinkText = useTranslatedText("about", "à propos");
  const contactLinkText = useTranslatedText("contact", "contact");
  const legalsLinkText = useTranslatedText("legals", "mentions légales");

  const handleSectionLinkClick = (target: string) => {
    setMenuIsOpened(false);
    document
      .querySelector(target)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.optionsContainer}>
          <ThemeButton />
          <LanguageButton />
        </div>
        <div
          className={styles.closeButton}
          onClick={() => setMenuIsOpened(false)}
        >
          X
        </div>
      </div>
      <div className={styles.linksContainer}>
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
