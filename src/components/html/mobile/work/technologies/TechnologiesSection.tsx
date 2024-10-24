import { Work } from "@/types/workTypes";
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
            perPage: 5,
            gap: "1rem",
            breakpoints: {
              1440: {
                perPage: 4,
              },
              1024: {
                perPage: 3,
              },
              768: {
                perPage: 2,
              },
              450: {
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
        <p>
          {lang === "en"
            ? work?.enTechnicalDescription
            : work?.frTechnicalDescription}
        </p>
        {work?.githubUrl && (
          <LinkButton url={work?.githubUrl} label={"github"} />
        )}
      </div>
    </>
  );
}
