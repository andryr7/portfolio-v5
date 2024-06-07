import styles from "./Presentation.module.css";

export function Presentation() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2>who I am</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
          <a href="https://google.com" target="_blank">
            sed
          </a>
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud <em>exercitation</em> exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in <em>voluptate</em> velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url('images/about/me.jpg')` }}
      />
    </div>
  );
}
