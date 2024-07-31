import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./ContactSection.module.css";
import { useCallback, useMemo, useState } from "react";
import { useAnimatedText } from "@/handlers/useAnimatedText";

export function ContactSection() {
  const [emailWasCopied, setEmailWasCopied] = useState<boolean>(false);
  const setHoveredContactLink = usePortfolioStore(
    (state) => state.setHoveredContactLink
  );
  const hoveredContactLink = usePortfolioStore(
    (state) => state.hoveredContactLink
  );

  const linkedinLinkText = useAnimatedText(
    hoveredContactLink === 0 ? "professional profile" : "linkedIn"
  );

  const githubLinkText = useAnimatedText(
    hoveredContactLink === 1 ? "developer profile" : "gitHub"
  );

  const emailLinkText = useAnimatedText(
    hoveredContactLink === 2 ? "copy personal contact" : "email"
  );

  const handleDesktopEmailClick = useCallback(() => {
    navigator.clipboard.writeText("contact@andryratsimba.com");
    setEmailWasCopied(true);
    setTimeout(() => setEmailWasCopied(false), 5000);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>contact</div>
      <div className={styles.linksContainerWrapper}>
        <div
          className={styles.linksContainer}
          onMouseLeave={() => setHoveredContactLink(null)}
        >
          <div className={styles.captionContainer}>
            open for business - feel free to contact me
          </div>
          <a
            className={styles.contactLink}
            onMouseEnter={() => setHoveredContactLink(0)}
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.linkedin.com/in/andryratsimba/"
          >
            {linkedinLinkText}
          </a>
          <a
            className={styles.contactLink}
            onMouseEnter={() => setHoveredContactLink(1)}
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/andryr7"
          >
            {githubLinkText}
          </a>
          <a
            className={styles.contactLink}
            onMouseEnter={() => setHoveredContactLink(2)}
            onClick={handleDesktopEmailClick}
          >
            {emailWasCopied ? "email was copied" : emailLinkText}
          </a>
        </div>
      </div>
    </div>
  );
}
