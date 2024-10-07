import { Route, Switch } from "wouter";
import { Home } from "@/pages/mobile/home/Home";
import { Work } from "@/pages/mobile/work/Work";
import { Footer } from "./footer/Footer";
import { Legals } from "@/pages/mobile/legals/Legals";
import { Error } from "@/pages/mobile/error/Error";

export function MobileRouter() {
  return (
    <>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/work/:workname">
          {(params) => <Work workSlug={params.workname} />}
        </Route>
        <Route path="/legals">
          <Legals />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
