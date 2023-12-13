import { setUserSubmitted, showError, toggleSubmit } from "../js/redux/actions";

function submitFigure(notDuplicate, redirect, data, firebase, showMessage) {
    return (dispatch, getState) => {
        if (notDuplicate) {
            firebase.itemsRef.push(data, function (error) {
                if (error) {
                    dispatch(showError(error.message));
                    redirect.error();
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
