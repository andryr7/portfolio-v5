import { useRoute } from "wouter";
import styles from "./Work.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { WorkHeader } from "@/components/html/work/header/WorkHeader";
import { WorkFooter } from "@/components/html/work/footer/WorkFooter";
import { TechnologiesSection } from "@/components/html/work/technologies/TechnologiesSection";
import { GeneralSection } from "@/components/html/work/general/GeneralSection";

export function Work() {
  const [_, params] = useRoute("/work/:workname");
  const currentWork = usePortfolioStore((state) => state.worksData).find(
    (work) => work.slug.current === params?.workname
  );

  return (
    <>
      {currentWork && (
        <>
          <div className={styles.container}>
            <WorkHeader work={currentWork} />
            <main>
              <section className={styles.section}>
                <GeneralSection work={currentWork} />
              </section>
              <div style={{ height: "20rem" }} />
              <section className={styles.section}>
                <TechnologiesSection work={currentWork} />
              </section>
              <div style={{ height: "20rem" }} />
            </main>
          </div>
          <WorkFooter work={currentWork} />
        </>
      )}
    </>
  );
}
