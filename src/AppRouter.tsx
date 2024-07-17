import { useRoute } from "wouter";
import { Home } from "./pages/home/Home";
import { Work } from "./pages/work/Work";
import { useEffect } from "react";

export function AppRouter() {
  const [isHomepage] = useRoute("/");

  useEffect(() => {
    if (isHomepage) {
      document.body.classList.remove("noscroll");
    } else if (!isHomepage) {
      document.body.classList.add("noscroll");
    }
  }, [isHomepage]);

  return (
    <>
      <Home />
      <Work />
    </>
  );
}
