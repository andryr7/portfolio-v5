import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { ContactLink } from "./ContactLink";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  const setHoveredContactLink = usePortfolioStore(
    (state) => state.setHoveredContactLink
  );

  return (
    <div className={styles.container}>
      <div className={styles.linksContainerWrapper}>
        <div
          className={styles.linksContainer}
          onMouseLeave={() => setHoveredContactLink(null)}
        >
          <div className={styles.captionContainer}>test</div>
          <ContactLink index={0}>1</ContactLink>
          <ContactLink index={1}>2</ContactLink>
          <ContactLink index={2}>3</ContactLink>
        </div>
      </div>
    </div>
  );
}
