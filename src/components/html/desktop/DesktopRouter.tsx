import { Error } from "@/pages/desktop/error/Error";
import { Home } from "@/pages/desktop/home/Home";
import { Legals } from "@/pages/legals/Legals";
import { Work } from "@/pages/desktop/work/Work";
import { Route, Switch } from "wouter";

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
