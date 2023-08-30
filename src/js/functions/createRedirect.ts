import * as ROUTES from "js/routes";


const createRedirect = (history:string[]) => {
  return ()  => ({
    error: () => {
      history.push(ROUTES.ERROR);
    },
    loading: () => {
      history.push(ROUTES.CONNECT);
    },
    home: () => {
      history.push(ROUTES.PERSONS);
    },
    landing: () => {
      history.push(ROUTES.LANDING);
    },
  });
};

export default createRedirect;
