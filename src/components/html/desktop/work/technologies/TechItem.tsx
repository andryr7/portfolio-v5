import styles from "./TechItem.module.css";
import { WorkUsedTech } from "@/types/work";

export function TechItem({ item }: { item: WorkUsedTech }) {
  return (
    <a
      className={styles.container}
      href={item.url}
      target="_blank"
      rel="noreferrer noopener"
    >
      <div>{item.type}</div>
      <div className={styles.itemLink}>
        <h4>{item.name}</h4>
        <span>{"->"}</span>
      </div>
    </a>
  );
}
