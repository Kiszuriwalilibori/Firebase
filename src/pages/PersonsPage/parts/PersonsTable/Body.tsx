import * as React from "react";
import uuid from "react-uuid";

import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import * as ROUTES from "routes";

import { showError } from "reduxware/actions";
import { FirebaseContext } from "contexts/firebaseContext";
import { ErrorType, FirebaseError } from "types";
import { AppDispatch } from "components/AppProvider";
import { selectPersons } from "reduxware/selectors";
import { Button, ClearIcon, RegularCell, Circle, EmailCell } from "./styles";

interface Props {
    showError: typeof showError;
}

const PersonsTableBody = (props: Props) => {
    const { showError } = props;
    const firebase = React.useContext(FirebaseContext);
    const navigate = useNavigate();
    const persons = useSelector(selectPersons);

    if (!persons || persons.length === 0) {
        return null;
    }

    const removeItem = (str: string) => {
        const itemRef = firebase.database.ref(`/items/${str}`);
        if (itemRef) {
            try {
                itemRef.remove();
            } catch (err: any) {
                const e = err as FirebaseError;
                showError({ errorMessage: e.message, isError: true });
                navigate(ROUTES.ERROR);
            }
        } else {
            showError({
                errorMessage:
                    "Podczas próby usunięcia użytkownika pojawił się problem. Wszystko wskazuje, że tego użytkownika nie ma już w bazie",
                isError: true,
            });
            navigate(ROUTES.ERROR);
        }
    };

    return (
        <tbody>
            {persons.map((person, index) => (
                <tr key={uuid()}>
                    <RegularCell key={uuid()}>
                        <Circle>{index + 1}</Circle>
                    </RegularCell>
                    <RegularCell key={uuid()}>{person.name}</RegularCell>
                    <RegularCell key={uuid()}>
                        <EmailCell>
                            <span>{person.email}</span>
                            {person.isAuthorised && (
                                <Button
                                    onClick={person.isAuthorised ? () => removeItem(person.firebaseRef) : () => {}}
                                    aria-label={"remove user having e-mail  " + person.email}
                                >
                                    <ClearIcon />
                                </Button>
                            )}{" "}
                        </EmailCell>
                    </RegularCell>
                </tr>
            ))}
        </tbody>
    );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    showError: (data: ErrorType) => dispatch(showError(data)),
});

export default connect(null, mapDispatchToProps)(PersonsTableBody);
