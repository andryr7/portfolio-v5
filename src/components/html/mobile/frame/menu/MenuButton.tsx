import styles from "./MenuButton.module.css";

export function OpenMenuButton({
  menuIsOpened,
  setMenuIsOpened,
}: {
  menuIsOpened: boolean;
  setMenuIsOpened: (newStatus: boolean) => void;
}) {
  const handleClick = () => {
    setMenuIsOpened(!menuIsOpened);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.menuBar} />
    </div>
  );
}
