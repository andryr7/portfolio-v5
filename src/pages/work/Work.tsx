import styles from "./Work.module.css";
import { WorkHeader } from "@/components/html/work/header/WorkHeader";
import { WorkFooter } from "@/components/html/work/footer/WorkFooter";
import { TechnologiesSection } from "@/components/html/work/technologies/TechnologiesSection";
import { GeneralSection } from "@/components/html/work/general/GeneralSection";
import ReactLenis, { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Work as WorkType } from "@/types/work";

export function Work({ currentWork }: { currentWork: WorkType }) {
  const globalLenisInstance = useLenis();

  useGSAP(() => {
    gsap.to(".work-page-container", { opacity: 1 });
  });

  return (
    <>
      {currentWork && (
        <ReactLenis className={styles.pageContainer + " work-page-container"}>
          <div className={styles.container}>
            <WorkHeader work={currentWork} />
            <main>
              <section className={styles.section}>
                <GeneralSection work={currentWork} key={currentWork._id} />
              </section>
              <div style={{ height: "20rem" }} />
              <section className={styles.section}>
                <TechnologiesSection work={currentWork} />
              </section>
              <div style={{ height: "20rem" }} />
            </main>
          </div>
          <WorkFooter
            work={currentWork}
            globalLenisInstance={globalLenisInstance}
          />
        </ReactLenis>
      )}
    </>
  );
}
