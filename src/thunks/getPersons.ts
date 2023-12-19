import Firebase from "contexts/firebaseContext";
import { login, showError, startLoading, stopLoading, setPersons } from "../reduxware/actions";
import { sortPersons } from "functions";
import { NavigateFunction } from "react-router-dom";
import * as ROUTES from "routes";
import { AppDispatch, RootStateType } from "components/AppProvider";
import { ShowMessage } from "hooks/useMessage";
import { ErrorType, Person, Persons } from "types";

export function getPersons(navigate: NavigateFunction, firebase: Firebase, showMessage: ShowMessage) {
    return (dispatch: AppDispatch, getState: () => RootStateType) => {
        firebase.connectedRef.on("value", function (snap) {
            if (snap.val() === true) {
                showMessage.info("Ustanowiono lub przywrócono połączenie z bazą danych");
            } else {
                setTimeout(() => {
                    snap.val() &&
                        showMessage.warning(
                            "W tej chwili nie masz połączenia z bazą. Wskazane jest abyś nie wykonywał operacji zapisu i odczytu, gdyż mają one wyłacznie lokalny zasięg i nie zmieniają bazy"
                        );
                }, 500);
            }
        });

        dispatch(startLoading());
        firebase.itemsRef.on(
            "value",
            snapshot => {
                const data = snapshot.val();
                if (!data) {
                    dispatch(
                        showError({ errorMessage: "Baza jest pusta lub wystąpił problem z połączeniem", isError: true })
                    );
                    navigate(ROUTES.ERROR);
                    return;
                }
                const persons = [] as any[];
                Object.entries(snapshot.val())
                    .map(entry => {
                        return { [entry[0]]: entry[1] };
                    })
                    .forEach(entry => {
                        const person = {
                            firebaseRef: Object.keys(entry)[0],
                            ...(entry[Object.keys(entry)[0]] as Object),
                        };
                        console.log(person);
                        persons.push(person);
                    });

                if (getState().sortParams.column && persons) {
                    dispatch(
                        setPersons(
                            sortPersons(persons, getState().sortParams.isDescending, getState().sortParams.column)
                        )
                    );
                } else {
                    if (persons) {
                        dispatch(setPersons(persons));
                    } /*else{dispatch(setPersons([]));} */ //if by mistake all is removed sending null is a sort of service entry
                }

                dispatch(stopLoading());
            },
            (error: ErrorType) => {
                showError(error);
                navigate(ROUTES.ERROR);
            }
        );

        firebase.auth.onAuthStateChanged(user => {
            user && dispatch(login(user));
        });
    };
}

export default getPersons;
