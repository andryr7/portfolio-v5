import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./ContactSection.module.css";
import { useCallback, useState } from "react";

export function ContactSection() {
  const [emailWasCopied, setEmailWasCopied] = useState<boolean>(false);
  const setHoveredContactLink = usePortfolioStore(
    (state) => state.setHoveredContactLink
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
            <div className={styles.openIndicator} />
            open to new opportunities
          </div>
          <a
            className={styles.contactLink}
            onMouseEnter={() => setHoveredContactLink(2)}
            onClick={handleDesktopEmailClick}
          >
            {emailWasCopied ? "email was copied" : "email"}
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
    </div>
  );
}
