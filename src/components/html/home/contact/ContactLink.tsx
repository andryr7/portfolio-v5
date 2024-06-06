import { ReactNode } from "react";
import styles from "./ContactLink.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function ContactLink({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const setHoveredContactLink = usePortfolioStore(
    (state) => state.setHoveredContactLink
  );

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setHoveredContactLink(index)}
    >
      {children}
    </div>
  );
}
