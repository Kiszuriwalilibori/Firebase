import * as ROUTES from "../js/routes";
import { showError } from "./actions";

function handleError(history, message) {
  return (dispatch) => {
    dispatch(showError(message));
    history.push(ROUTES.ERROR);
  };
}

export default handleError;
