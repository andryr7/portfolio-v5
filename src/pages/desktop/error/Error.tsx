import { useGSAP } from "@gsap/react";
import styles from "./Error.module.css";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { useTranslatedText } from "@/handlers/useTranslatedText";

const squarelist = [
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  false,
  false,
  true,
];

function GlyphSquare({ value }: { value: boolean }) {
  return (
    <div className={value ? styles.activeSquare : styles.inactiveSquare} />
  );
}

export function Error() {
  useGSAP(() => {
    gsap.to(".page-container", { opacity: 1 });
  });

  const text = useTranslatedText("page not found", "page non trouvée");

  return (
    <>
      <ReactLenis className={styles.pageContainer + " page-container"}>
        <div className={styles.container}>
          <div className={styles.glyphContainer}>
            {squarelist.map((square, index) => {
              return <GlyphSquare key={index} value={square} />;
            })}
          </div>
          <span>{text}</span>
        </div>
      </ReactLenis>
    </>
  );
}
