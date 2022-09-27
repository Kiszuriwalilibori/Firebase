import * as ROUTES from "js/routes";
//import { History } from "history";
// import { RedirectType } from "types";

const createRedirect = (history /*: History*/) => {
  return () /*: RedirectType*/ => ({
    error: () => {
      history.push(ROUTES.ERROR);
    },
    loading: () => {
      history.push(ROUTES.CONNECT);
    },
    home: () => {
      history.push(ROUTES.PERSONS);
    },
  });
};

export default createRedirect;
