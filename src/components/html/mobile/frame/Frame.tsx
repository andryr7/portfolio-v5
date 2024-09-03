import styles from "./Frame.module.css";
import { useState } from "react";
import { Menu, MenuButton } from "./menu/Menu";
import { Link, useRoute } from "wouter";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Frame() {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [isHomepage] = useRoute("/");
  const lang = usePortfolioStore((state) => state.language);

  // useEffect(() => {
  //   if (menuIsOpened) {
  //     document.body.classList.add("no-scroll");
  //   } else {
  //     document.body.classList.remove("no-scroll");
  //   }
  // });

  return (
    <>
      <div className={styles.container}>
        {!menuIsOpened && isHomepage && (
          <div className={styles.optionsContainer}>
            <MenuButton
              menuIsOpened={menuIsOpened}
              setMenuIsOpened={setMenuIsOpened}
            />
          </div>
        )}
        {menuIsOpened && isHomepage && (
          <Menu menuIsOpened={menuIsOpened} setMenuIsOpened={setMenuIsOpened} />
        )}
        {!isHomepage && (
          <Link href="/" className={styles.homeLink}>
            {"-> "}
            {lang === "en" ? "back to homepage" : "retour à l'accueil"}
          </Link>
        )}
      </div>
    </>
  );
}
