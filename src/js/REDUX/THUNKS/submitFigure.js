import { hideAddedUserMessage, submitUser, showError, showWarning, toggleSubmit } from '../actions';

function submitFigure(notDuplicate, redirect, data, firebase) {
    return (dispatch, getState) => {
        if (notDuplicate) {
            firebase.itemsRef.push(data, function (error) {
                if (error) {
                    dispatch(showError(error.message));
                    redirect.error();
                    dispatch(toggleSubmit());
                } else {
                    setTimeout(function () {
                        dispatch(hideAddedUserMessage());
                    }, 3000);
                    dispatch(submitUser(data));
                    dispatch(toggleSubmit());
                }
            });
        } else {
            dispatch(showWarning('Użytkownik o tym e-mailu jest już zarejestrowany'));
            dispatch(toggleSubmit());
        }
    };
}
export default submitFigure;
