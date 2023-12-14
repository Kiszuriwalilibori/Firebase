import { setUserSubmitted, showError, toggleSubmit } from "../reduxware/actions";
import * as ROUTES from "routes";

function submitFigure(notDuplicate, navigate, data, firebase, showMessage) {
    return dispatch => {
        if (notDuplicate) {
            firebase.itemsRef.push(data, function (error) {
                if (error) {
                    dispatch(showError(error.message));
                    navigate(ROUTES.ERROR);
                    dispatch(toggleSubmit());
                } else {
                    dispatch(setUserSubmitted());
                    showMessage.success("You have successfully added and user");
                    dispatch(toggleSubmit());
                }
            });
        } else {
            dispatch(toggleSubmit());
        }
    };
}
export default submitFigure;
