import { Frame } from "./components/html/mobile/frame/Frame";
import { Loader } from "./components/html/mobile/loader/Loader";
import { useLoadData } from "./handlers/useLoadData";
import { useTheme } from "./handlers/useTheme";
import "./MobileApp.css";

export default function MobileApp() {
  const isLoading = useLoadData();

  //Theme handling
  useTheme();

  return (
    <>
      <Loader isLoading={isLoading} />
      <Frame />
      {!isLoading && (
        <div className="mobile-app-container">
          <header className="page" style={{ backgroundColor: "yellow" }}>
            header
          </header>
          <main>
            <section className="page" style={{ backgroundColor: "red" }}>
              section 1
            </section>
            <section className="page" style={{ backgroundColor: "blue" }}>
              section 2
            </section>
            <section className="page" style={{ backgroundColor: "green" }}>
              section 3
            </section>
          </main>
          <footer className="page" style={{ backgroundColor: "purple" }}>
            footer
          </footer>
        </div>
      )}
    </>
  );
}
