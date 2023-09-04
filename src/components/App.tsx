import loadable from "@loadable/component";

import { Route, Routes } from "react-router-dom";

import * as ROUTES from "js/routes";
import "styles/App.css";
import { useHandleConnectionStatus } from "hooks";
import { LandingPage } from "pages";

const Persons = loadable(() => import("pages/PersonsPage"));
const Error = loadable(() => import("pages/ErrorPage"));

const App = (): JSX.Element => {
    useHandleConnectionStatus();
    return (
        // <main>
        <Routes>
            <Route path={ROUTES.LANDING} element={<LandingPage />} />
            <Route path={ROUTES.PERSONS} element={<Persons />} />
            <Route path={ROUTES.ERROR} element={<Error />} />
        </Routes>
        // </main>
    );
};

export default App;
