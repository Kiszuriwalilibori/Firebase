import { getDataDone, login, showError, showLoader, hideLoader } from "../js/redux/actions";
import { sortFigures } from "js/functions";

export function getPersons(redirect, firebase, showMessage) {
    return (dispatch, getState) => {
        firebase.connectedRef.on("value", function (snap) {
            if (snap.val() === true) {
                showMessage.info("Ustanowiono lub przywrócono połączenie z bazą danych");
            } else {
                // showMessage.error(
                //     "W tej chwili nie masz połączenia z bazą. Wskazane jest abyś nie wykonywał operacji zapisu i odczytu, gdyż mają one wyłacznie lokalny zasięg i nie zmieniają bazy"
                // );
                dispatch(
                    showError(
                        "W tej chwili nie masz połączenia z bazą. Wskazane jest abyś nie wykonywał operacji zapisu i odczytu, gdyż mają one wyłacznie lokalny zasięg i nie zmieniają bazy"
                    )
                );
                redirect.error();
            }
        });

        dispatch(showLoader());
        firebase.itemsRef.on(
            "value",
            snapshot => {
                const data = snapshot.val();
                if (!data) {
                    //prevents reading empty database
                    dispatch(showError("Baza jest pusta lub wystąpił problem z połączeniem"));
                    redirect.error();
                    return;
                }

                for (let property in data) {
                    const x = data[property];
                    const y = [property];
                    y[1] = x.name;
                    y[2] = x.email;
                    y[3] = x.user;

                    data[property] = y;
                }
                const column = getState().columnSortBy;
                if (column) {
                    dispatch(getDataDone(sortFigures(Object.values(data), getState().isSortDescending, column)));
                } else {
                    if (data) {
                        dispatch(getDataDone(Object.values(data)));
                    } /*else{dispatch(getDataDone(null));} */ //if by mistake all is removed sending null is a sort of service entry
                }

                dispatch(hideLoader());
            },
            error => {
                showError(error);
                redirect.error();
            }
        );

        firebase.auth.onAuthStateChanged(user => {
            user && dispatch(login(user));
        });
    };
}

export default getPersons;
