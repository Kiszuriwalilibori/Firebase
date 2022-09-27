import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

import { LandingPage } from "pages";
import Awaiting from "components/Awaiting";
import * as ROUTES from "js/routes";
import "styles/App.css";

const Persons = lazy(() => import("pages/PersonsPage"));
const Error = lazy(() => import("pages/ErrorPage"));
const Connecting = lazy(() => import("pages/ConnectingPage"));

const App = (): JSX.Element => {
  return (
    <main>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.PERSONS} component={Awaiting(Persons)} />
        <Route exact path={ROUTES.ERROR} component={Awaiting(Error)} />
        <Route exact path={ROUTES.CONNECT} component={Awaiting(Connecting)} />
      </Switch>
    </main>
  );
};

export default App;
