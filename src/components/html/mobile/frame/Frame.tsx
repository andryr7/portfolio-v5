import styles from "./Frame.module.css";
import { useState } from "react";
import { Link, useRoute } from "wouter";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { OpenMenuButton } from "./menu/MenuButton";
import { MobileMenu } from "./menu/MobileMenu";

export function Frame() {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [isHomepage] = useRoute("/");
  const lang = usePortfolioStore((state) => state.language);

  return (
    <>
      <div className={styles.container}>
        {isHomepage && (
          <OpenMenuButton
            menuIsOpened={menuIsOpened}
            setMenuIsOpened={setMenuIsOpened}
          />
        )}
        {!isHomepage && (
          <Link href="/" className={styles.homeLink}>
            {"-> "}
            {lang === "en" ? "back to homepage" : "retour à l'accueil"}
          </Link>
        )}
      </div>
      {isHomepage && menuIsOpened && (
        <MobileMenu setMenuIsOpened={setMenuIsOpened} />
      )}
    </>
  );
}

//TODO find a way to lock scroll
// useEffect(() => {
//   if (menuIsOpened) {
//     document.body.classList.add("no-scroll");
//   } else {
//     document.body.classList.remove("no-scroll");
//   }
// });
