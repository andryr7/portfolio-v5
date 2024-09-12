import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./ContactSection.module.css";
import { useCallback, useState } from "react";
import { useTranslatedText } from "@/handlers/useTranslatedText";
import useTime from "@/handlers/useTime";

export function ContactSection() {
  const [emailWasCopied, setEmailWasCopied] = useState<boolean>(false);
  const setHoveredContactLink = usePortfolioStore(
    (state) => state.setHoveredContactLink
  );
  const captionText = useTranslatedText(
    "open to new opportunities",
    "ouvert aux opportunités"
  );
  const emailLinkText = useTranslatedText("email was copied", "email copié");
  const time = useTime();

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
            <div className={styles.openIndicator} />
            {captionText}
          </div>
          <a
            className={styles.contactLink}
            onMouseEnter={() => setHoveredContactLink(2)}
            onClick={handleDesktopEmailClick}
          >
            {emailWasCopied ? emailLinkText : "email"}
          </a>
          <a
            className={styles.contactLink}
            onMouseEnter={() => setHoveredContactLink(0)}
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.linkedin.com/in/andryratsimba/"
          >
            linkedIn
          </a>
          <a
            className={styles.contactLink}
            onMouseEnter={() => setHoveredContactLink(1)}
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/andryr7"
          >
            gitHub
          </a>
        </div>
      </div>
      <span className={styles.location}>Toulouse, France</span>
      <span className={styles.time}>{time.toLocaleTimeString()}</span>
    </div>
  );
}
