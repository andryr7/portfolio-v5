import { Work } from "@/types/work";
import styles from "./TechnologiesSection.module.css";
import { LinkButton } from "../LinkButton";

//Splide slider imports
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { TechItem } from "./TechItem";

export function TechnologiesSection({ work }: { work: Work }) {
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
        <p>{work?.technicalDescription}</p>
      </div>
      {work?.githubUrl && (
        <LinkButton url={work?.githubUrl} label={"github repo"} />
      )}
    </>
  );
}
