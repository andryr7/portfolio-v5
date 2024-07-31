import styles from "./LinkButton.module.css";

export function LinkButton({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.container}
    >
      {label + " ->"}
    </a>
  );
}
