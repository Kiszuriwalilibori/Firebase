import { NavigateFunction } from "react-router-dom";
import { setUserSubmitted, showError, toggleSubmit } from "../reduxware/actions";
import * as ROUTES from "routes";
import { ShowMessage } from "hooks/useMessage";
import { SetUser } from "types";
import Firebase from "contexts/firebaseContext";
import { AppDispatch } from "components/AppProvider";

function submitFigure(
    notDuplicate: boolean,
    navigate: NavigateFunction,
    data: SetUser,
    firebase: Firebase,
    showMessage: ShowMessage
) {
    return (dispatch: AppDispatch) => {
        if (notDuplicate) {
            firebase.itemsRef.push(data, function (error) {
                if (error) {
                    dispatch(showError({ errorMessage: error.message, isError: true }));
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
