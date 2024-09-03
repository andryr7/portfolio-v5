import { Work } from "@/types/work";
import { SanityImage } from "sanity-image";
import { LinkButton } from "../LinkButton";
import styles from "./GeneralSection.module.css";

//Splide slider imports
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function GeneralSection({ work }: { work: Work }) {
  const lang = usePortfolioStore((state) => state.language);

  return (
    <>
      <Splide
        options={{ rewind: true, lazyLoad: false }}
        aria-label={`${work?.title} project image slider`}
      >
        {work?.images?.map((image, index) => (
          <SplideSlide key={image._key}>
            <div className={styles.workImageContainer}>
              <SanityImage
                baseUrl={`https://cdn.sanity.io/images/${
                  import.meta.env.VITE_SANITY_PROJECT_ID
                }/${import.meta.env.VITE_SANITY_DATASET}/`}
                id={image.asset._ref}
                alt={`${work.title} project - image ${index}`}
                className={styles.workImage}
                loading="eager"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
      <div className={styles.infoContainer}>
        <p>
          {lang === "en"
            ? work?.enGeneralDescription
            : work?.frGeneralDescription}
        </p>
        {work?.liveUrl && (
          <LinkButton url={work?.liveUrl} label={"live website"} />
        )}
      </div>
    </>
  );
}
