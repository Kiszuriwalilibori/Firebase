import React, { useEffect, useRef, useContext } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import { useFormik } from "formik";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";
import { SubmitFigureArgs, submitFigure } from "thunks";
import SubmitFormButton from "./SubmitFormButton";

import { Input } from "styles/style";
import { FirebaseContext } from "contexts/firebaseContext";
import { showError, toggleSubmit } from "reduxware/actions";
import { useMessage } from "hooks";
import { selectIsLogged } from "reduxware/selectors";
import { AppDispatch, RootStateType } from "components/AppProvider";
import { ErrorType, User } from "types";

const PERSON_REGEX = "[a-zA-ZąĄććęęłŁńŃóÓśŚżŻŹŹ ]+" as unknown as RegExp;

const yupConfig = {
    schema: {
        personEmail: Yup.string().email("Invalid email address").required("Required"),
        personName: Yup.string()
            .min(4, "Must be more than 3 characters")
            .required("Required")
            .matches(PERSON_REGEX, "Invalid characters"),
    },
    initialValues: {
        personEmail: "",
        personName: "",
    },
};

interface Props {
    user: User;
    submitFigure: (...args: SubmitFigureArgs) => void;
    toggleSubmit: () => void;
}

const AddPersonForm = (props: Props) => {
    const input = useRef<HTMLInputElement>(null);
    const isLogged = useSelector(selectIsLogged);
    const { user, submitFigure, toggleSubmit } = props;
    const firebase = useContext(FirebaseContext);
    const showMessage = useMessage();
    const navigate = useNavigate();

    const isFormEmpty = () => !!(values.personName === "" && values.personEmail === "");
    useEffect(() => {
        if (input.current) {
            input.current.focus();
        }
    }, [input]);

    const { values, handleSubmit, getFieldProps, handleReset, submitCount, errors } = useFormik({
        initialValues: yupConfig.initialValues,
        validationSchema: Yup.object().shape(yupConfig.schema),
        onSubmit() {
            if (isLogged) {
                toggleSubmit();
                firebase.itemsRef
                    .orderByChild("email")
                    .equalTo(values.personEmail)
                    .once("value", (snapshot: firebase.database.DataSnapshot) => {
                        const isNotDuplicate = !snapshot.exists();
                        if (snapshot.exists()) showMessage.warning("Użytkownik o tym e-mailu jest już zarejestrowany");
                        submitFigure(
                            isNotDuplicate,
                            navigate,
                            {
                                name: values.personName,
                                email: values.personEmail,
                                user: (user.displayName as string) || (user.email as string),
                            },
                            firebase,
                            showMessage
                        );
                    });
            } else {
                showMessage.warning("Tylko zalogowani użytkownicy mogą dodawać postacie");
            }
        },
    });

    return (
        <Input.OuterWrapper onSubmit={handleSubmit}>
            <Input.InnerWrapper>
                <Input.Input
                    required
                    minLength={2}
                    maxLength={20}
                    pattern="[a-zA-ZąĄććęęłŁńŃóÓśŚżŻŹŹ ]+"
                    placeholder="Name..."
                    type="text"
                    ref={input}
                    {...getFieldProps("personName")}
                />
            </Input.InnerWrapper>
            <Input.InputWrapper>
                <Input.Input
                    minLength={2}
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    placeholder="Email..."
                    type="text"
                    {...getFieldProps("personEmail")}
                />
            </Input.InputWrapper>

            <SubmitFormButton />
            {!isFormEmpty() && (
                <Input.ResetWrapper onClick={handleReset}>
                    <Input.DangerMessage>
                        <u> Reset Fields</u>
                    </Input.DangerMessage>
                </Input.ResetWrapper>
            )}
            {submitCount > 0 && !isEmpty(errors) && <ErrorMessage errors={errors} />}
        </Input.OuterWrapper>
    );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    showError: (data: ErrorType) => {
        dispatch(showError(data));
    },

    submitFigure: (...args: SubmitFigureArgs) => {
        dispatch(submitFigure(...args));
    },
    toggleSubmit: () => {
        dispatch(toggleSubmit());
    },
});

const mapStateToProps = (state: RootStateType) => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonForm);

AddPersonForm.propTypes = {
    onSubmit: PropTypes.func,
    submitFigure: PropTypes.func,
    toggleSubmit: PropTypes.func,
    user: PropTypes.object,
    history: PropTypes.object,
};
