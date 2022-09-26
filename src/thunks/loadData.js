import { getDataDone, login, showError, toggleSpinner, showMessage } from "../js/redux/actions";
import { sortFigures } from "../js/functions";

export function load(redirect, context) {
  return (dispatch, getState) => {
    context.connectedRef.on("value", function (snap) {
      if (snap.val() === true) {
        dispatch(showMessage("Ustanowiono lub przywrócono połączenie z bazą danych"));
      } else {
        dispatch(showError("W tej chwili nie masz połączenia z bazą. Wskazane jest abyś nie wykonywał operacji zapisu i odczytu, gdyż mają one wyłacznie lokalny zasięg i nie zmieniają bazy"));
        redirect.error();
      }
    });

    dispatch(toggleSpinner());
    redirect.loading(); // ale nadal przy pierwszym właczeniu bez internetu kręci się kręcioł bez końca może jednak trza zrobić tak: jeżeli zaskoczy snapshot jak poniżej to gasi settimeouta który w innej sytuacji wybije error po czasie
    context.itemsRef.on(
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
        dispatch(toggleSpinner());
        redirect.home();
      },
      error => {
        showError(error);
        redirect.error();
      }
    );

    context.auth.onAuthStateChanged(user => {
      user && dispatch(login(user));
    });
  };
}

export default load;
