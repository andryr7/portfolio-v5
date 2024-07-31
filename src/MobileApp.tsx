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
        <>
          <header className="page">header</header>
          <main>
            <section className="page">section 1</section>
            <section className="page">section 2</section>
            <section className="page">section 3</section>
          </main>
          <footer className="page">footer</footer>
        </>
      )}
    </>
  );
}
