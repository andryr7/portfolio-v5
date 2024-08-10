import styles from "./Presentation.module.css";

export function Presentation() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2>Hello there</h2>
        <p>
          {/* <a href="https://google.com" target="_blank">
            sed
          </a> */}
          Originally trained in marketing and communication, my passion for
          computers dates back to childhood. Following a successful career
          transition in 2022, I became a web developer. While my main focus is
          on frontend development, I also enjoy delving into backend aspects and
          deployment challenges, which cater to my versatile nature. I have a
          particular fondness for 3D technologies, a passion I've nurtured since
          childhood and love incorporating into my projects. Having worked as a
          freelancer for nearly two years, I've developed a broad skill set and
          am open to new opportunities.
        </p>
      </div>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url('/images/about/me.jpg')` }}
      />
    </div>
  );
}
