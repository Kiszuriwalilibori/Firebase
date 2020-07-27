import React, { lazy } from "react";
import ReactDOM from "react-dom";
import "./styles/App.css";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import LandingPage from "./components/LandingPage";
import reducer from "./js/REDUCERS/reducer";
import * as serviceWorker from "./serviceWorker";
import * as ROUTES from "./js/ROUTES/routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Awaiting from "./components/Awaiting";

const App = lazy(() => import("./components/App"));
const Login = lazy(() => import("./components/Login"));
const Error = lazy(() => import("./components/Error"));
const Loader = lazy(() => import("./components/Loader"));
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.HOME} component={Awaiting(App)} />
        <Route exact path={ROUTES.LOGIN} component={Awaiting(Login)} />
        <Route exact path={ROUTES.ERROR} component={Awaiting(Error)} />
        <Route exact path={ROUTES.CONNECT} component={Awaiting(Loader)} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// function noConnection() {
//   const state = store.getState();
//   if (state.isError) { window.alert('Błąd połączenia albo zasób sieciowy nie jest dostępny'); }
// }
// store.subscribe(noConnection);

serviceWorker.unregister();
