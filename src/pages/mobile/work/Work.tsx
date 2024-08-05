import { WorkHeader } from "@/components/html/mobile/work/header/WorkHeader";
import styles from "./Work.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Redirect } from "wouter";
import { GeneralSection } from "@/components/html/mobile/work/general/GeneralSection";
import { TechnologiesSection } from "@/components/html/mobile/work/technologies/TechnologiesSection";
import { WorkFooter } from "@/components/html/mobile/work/footer/WorkFooter";

export function Work({ workSlug }: { workSlug: string }) {
  const currentWork = usePortfolioStore((state) => state.worksData).find(
    (work) => work.slug.current === workSlug
  );

  return (
    <>
      <div className={styles.pageContainer}>
        {!currentWork && <Redirect to="/404" />}
        {currentWork && (
          <>
            <div className={styles.container}>
              <WorkHeader work={currentWork} />
              <main className={styles.main}>
                <section className={styles.section}>
                  <GeneralSection work={currentWork} key={currentWork._id} />
                </section>
                <section className={styles.section}>
                  <TechnologiesSection work={currentWork} />
                </section>
              </main>
            </div>
            <WorkFooter work={currentWork} />
          </>
        )}
      </div>
    </>
  );
}
