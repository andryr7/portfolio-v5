import { Error } from "@/pages/error/Error";
import { Home } from "@/pages/desktop/home/Home";
import { Legals } from "@/pages/desktop/legals/Legals";
import { Route, Switch } from "wouter";
import { Work } from "@/pages/desktop/work/Work";

export function DesktopRouter() {
  return (
    <>
      <Home />
      <Switch>
        <Route path="/" />
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
    </>
  );
}
