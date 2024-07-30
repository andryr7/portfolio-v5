import { Error } from "@/pages/error/Error";
import { Home } from "@/pages/home/Home";
import { Legals } from "@/pages/legals/Legals";
import { Work } from "@/pages/work/Work";
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
