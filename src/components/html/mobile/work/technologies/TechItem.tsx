import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./TechItem.module.css";
import { WorkUsedTech } from "@/types/workTypes";

export function TechItem({ item }: { item: WorkUsedTech }) {
  const lang = usePortfolioStore((state) => state.language);

  return (
    <a
      className={styles.container}
      href={item.url}
      target="_blank"
      rel="noreferrer noopener"
    >
      <div>{lang === "en" ? item.enType : item.frType}</div>
      <div className={styles.itemLink}>
        <h4>{item.name}</h4>
        <span>{"->"}</span>
      </div>
    </a>
  );
}
