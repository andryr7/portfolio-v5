import styles from "./Work.module.css";
import { WorkHeader } from "@/components/html/desktop/work/header/WorkHeader";
import { WorkFooter } from "@/components/html/desktop/work/footer/WorkFooter";
import { TechnologiesSection } from "@/components/html/desktop/work/technologies/TechnologiesSection";
import { GeneralSection } from "@/components/html/desktop/work/general/GeneralSection";
import ReactLenis, { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Redirect } from "wouter";

export function Work({ workSlug }: { workSlug: string }) {
  const globalLenisInstance = useLenis();
  const currentWork = usePortfolioStore((state) => state.worksData).find(
    (work) => work.slug.current === workSlug
  );
  const isDarkTheme = usePortfolioStore((state) => state.isDarkTheme);

  useGSAP(() => {
    gsap.to(".work-page-container", { opacity: 1 });
  });

  return (
    <>
      <ReactLenis className={styles.pageContainer + " work-page-container"}>
        {!currentWork && <Redirect to="/404" />}
        {currentWork && (
          <div
            style={{
              backgroundColor: isDarkTheme
                ? currentWork.darkColor
                : currentWork.lightColor,
            }}
          >
            <div className={styles.container}>
              <WorkHeader work={currentWork} />
              <main className={styles.mainContainer}>
                <section className={styles.section}>
                  <GeneralSection work={currentWork} key={currentWork._id} />
                </section>
                <section className={styles.section}>
                  <TechnologiesSection work={currentWork} />
                </section>
              </main>
            </div>
            <WorkFooter
              work={currentWork}
              globalLenisInstance={globalLenisInstance}
            />
          </div>
        )}
      </ReactLenis>
    </>
  );
}
