import { login, showError, startLoading, stopLoading, setPersons } from "../js/redux/actions";
import { sortPersons } from "js/functions";

export function getPersons(redirect, firebase, showMessage) {
    return (dispatch, getState) => {
        firebase.connectedRef.on("value", function (snap) {
            if (snap.val() === true) {
                showMessage.info("Ustanowiono lub przywrócono połączenie z bazą danych");
            } else {
                showMessage.warning(
                    "W tej chwili nie masz połączenia z bazą. Wskazane jest abyś nie wykonywał operacji zapisu i odczytu, gdyż mają one wyłacznie lokalny zasięg i nie zmieniają bazy"
                );
            }
        });

        dispatch(startLoading());
        firebase.itemsRef.on(
            "value",
            snapshot => {
                const data = snapshot.val();

                if (!data) {
                    dispatch(showError("Baza jest pusta lub wystąpił problem z połączeniem"));
                    redirect.error();
                    return;
                }
                const persons = [];
                Object.entries(snapshot.val())
                    .map(entry => {
                        return { [entry[0]]: entry[1] };
                    })
                    .forEach(entry => {
                        const person = { firebaseRef: Object.keys(entry)[0], ...entry[Object.keys(entry)[0]] };
                        persons.push(person);
                    });
                const columnPersons = getState().sortParams.column;

                if (columnPersons && persons) {
                    dispatch(setPersons(sortPersons(persons, getState().sortParams.isDescending, columnPersons)));
                } else {
                    if (persons) {
                        dispatch(setPersons(persons));
                    } /*else{dispatch(setPersons([]));} */ //if by mistake all is removed sending null is a sort of service entry
                }

                dispatch(stopLoading());
            },
            error => {
                showError(error.message);
                redirect.error();
            }
        );

        firebase.auth.onAuthStateChanged(user => {
            user && dispatch(login(user));
        });
    };
}

export default getPersons;
