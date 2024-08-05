import styles from "./Frame.module.css";
import { useEffect, useState } from "react";
import { Menu, MenuButton } from "./menu/Menu";

export function Frame() {
  const [menuIsOpened, setMenuIsOpened] = useState(false);

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
        {!menuIsOpened && (
          <div className={styles.optionsContainer}>
            <MenuButton setMenuIsOpened={setMenuIsOpened} />
          </div>
        )}
        {menuIsOpened && <Menu setMenuIsOpened={setMenuIsOpened} />}
      </div>
    </>
  );
}
