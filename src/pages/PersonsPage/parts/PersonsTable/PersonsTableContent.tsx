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
import { useMessage } from "hooks";

interface Props {
    showError: typeof showError;
}

const PersonsTableContent = (props: Props) => {
    const { showError } = props;
    const firebase = React.useContext(FirebaseContext);
    const navigate = useNavigate();
    const persons = useSelector(selectPersons);
    const showMessage = useMessage();

    const handleRemovePerson = React.useCallback((str: string) => {
        const itemRef = firebase.database.ref(`/items/${str}`);
        if (itemRef) {
            try {
                itemRef.remove();
                showMessage.success("Person succesfully removed");
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
    }, []);

    if (!persons || persons.length === 0) {
        return null;
    }

    return (
        <tbody>
            {persons.map((person, index) => (
                <tr key={uuid()} style={{ height: 75 }}>
                    <RegularCell key={uuid()}>
                        <Circle>{index + 1}</Circle>
                    </RegularCell>
                    <RegularCell key={uuid()}>{person.name}</RegularCell>
                    <RegularCell key={uuid()}>
                        <EmailCell>
                            <span>{person.email}</span>
                            {person.isAuthorised && (
                                <Button
                                    onClick={
                                        person.isAuthorised ? () => handleRemovePerson(person.firebaseRef) : () => {}
                                    }
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

export default connect(null, mapDispatchToProps)(PersonsTableContent);
