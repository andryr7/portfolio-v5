import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>
          Andry
          <br />
          Ratsimba
        </h1>
        <h2>
          independent
          <br />
          web developer
        </h2>
      </div>
    </header>
  );
}
