import * as ROUTES from "js/routes";
import { NavigateFunction } from "react-router-dom";

const createRedirect = (history: NavigateFunction) => {
    return () => ({
        error: () => {
            history(ROUTES.ERROR);
        },
        home: () => {
            history(ROUTES.PERSONS);
        },
        landing: () => {
            history(ROUTES.LANDING);
        },
    });
};

export default createRedirect;
