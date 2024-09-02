import { Work } from "@/types/work";
import styles from "./TechnologiesSection.module.css";
import { LinkButton } from "../LinkButton";

//Splide slider imports
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { TechItem } from "./TechItem";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function TechnologiesSection({ work }: { work: Work }) {
  const lang = usePortfolioStore((state) => state.language);

  return (
    <>
      <h2 className={styles.sectionTitle}>Technologies</h2>
      <div className={styles.techContainer}>
        <Splide
          options={{
            rewind: true,
            lazyLoad: false,
            gap: "1rem",
            perPage: 5,
            breakpoints: {
              1920: {
                perPage: 4,
              },
              1440: {
                perPage: 3,
              },
              1024: {
                perPage: 2,
              },
              500: {
                perPage: 1,
              },
            },
          }}
          aria-label={`${work?.title} technologies slider`}
        >
          {work?.usedTechs?.map((tech) => (
            <SplideSlide key={tech._id}>
              <TechItem item={tech} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.linksContainer}>
          {work?.githubUrl && (
            <LinkButton url={work?.githubUrl} label={"github"} />
          )}
        </div>
        <p>
          {lang === "en"
            ? work?.enTechnicalDescription
            : work?.frTechnicalDescription}
        </p>
      </div>
    </>
  );
}
