import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./Presentation.module.css";

const enPresentationText =
  "With a degree in marketing and communication, my passion for IT led me to become a web developer in 2022. Specializing in frontend development, I also enjoy applying my creativity and precision to backend challenges, with a particular love for 3D technologies. After two years of training and working independently, I am now seeking long-term opportunities. Feel free to contact me!";

const frPresentationText =
  "Diplômé en marketing et communication, ma passion pour l'informatique m'a conduit à devenir développeur web en 2022. Spécialisé en frontend, j'aime aussi déployer ma créativité et ma rigueur sur des problématiques backend, tandis que j'ai un amour particulier pour les technologies 3d. Après deux ans de formation et de travail en indépendant, je suis à la recherche d'opportunités à long terme. N'hésitez pas à me contacter !";

export function Presentation() {
  const lang = usePortfolioStore((state) => state.language);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2>Hello there !</h2>
        <p>
          {/* <a href="https://google.com" target="_blank">
            sed
          </a> */}
          {lang === "en" ? enPresentationText : frPresentationText}
        </p>
      </div>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url('/images/about/me.jpg')` }}
      />
    </div>
  );
}
