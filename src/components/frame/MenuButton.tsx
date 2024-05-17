import { Link } from "wouter";
import styles from "./MenuButton.module.css";
import { useState } from "react";

function CloseMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      <div />
    </button>
  );
}

function MenuItem({ href }: { href: string }) {
  return (
    <Link href={href} className={styles.menuItem}>
      test
    </Link>
  );
}

export function MenuButton() {
  const [opened, open] = useState<boolean>(true);

  const handleClick = () => {
    open((c) => !c);
  };

  return (
    <div className={`${styles.container} ${opened ? "" : styles.closed}`}>
      <div className={styles.options}>
        <span>2024 portfolio</span>
        <CloseMenuButton onClick={handleClick} />
      </div>
      <MenuItem href="/" />
      <MenuItem href="/" />
      <MenuItem href="/" />
    </div>
  );
}
