import React, { useEffect, useRef, useContext } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import { useFormik } from "formik";
import { connect } from "react-redux";

import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { Input } from "styles/style";
import { FirebaseContext } from "contexts/firebaseContext";
import { showError, hideAddedUserMessage, showWarning, toggleSubmit } from "js/redux/actions";

import submitFigure from "thunks/submitFigure";
import AddPersonButton from "./AddPersonButton";
import * as ROUTES from "js/routes";

const AddPersonForm = props => {
    const input = useRef(null);
    const navigate = useNavigate();
    const { user, submitFigure, toggleSubmit } = props;
    const firebase = useContext(FirebaseContext);
    const { enqueueSnackbar } = useSnackbar();

    const redirect = React.useMemo(
        () => ({
            error: () => {
                navigate(ROUTES.ERROR);
            },
            home: () => {
                navigate(ROUTES.PERSONS);
            },
        }),
        [navigate]
    );

    const isResetFieldsHidden = () => !!(values.personName === "" && values.personEmail === "");
    useEffect(() => input.current.focus(), [input]);

    const { values, handleSubmit, getFieldProps, handleReset, submitCount, errors } = useFormik({
        initialValues: {
            personEmail: "",
            personName: "",
        },
        validationSchema: Yup.object().shape({
            personEmail: Yup.string().email("Invalid email address").required("Required"),
            personName: Yup.string()
                .min(4, "Must be more than 3 characters")
                .required("Required")
                .matches("[a-zA-ZąĄććęęłŁńŃóÓśŚżŻŹŹ ]+", "Invalid characters"),
        }),
        onSubmit() {
            if (user) {
                toggleSubmit();
                firebase.itemsRef
                    .orderByChild("email")
                    .equalTo(values.personEmail)
                    .once("value", snapshot => {
                        const isNotDuplicate = !snapshot.exists();
                        if (snapshot.exists())
                            enqueueSnackbar("Użytkownik o tym e-mailu jest już zarejestrowany", { variant: "warning" });
                        submitFigure(
                            isNotDuplicate,
                            redirect,
                            {
                                name: values.personName,
                                email: values.personEmail,
                                user: user.displayName || user.email,
                            },
                            firebase
                        );
                    });
            } else {
                enqueueSnackbar("Tylko zalogowani użytkownicy mogą dodawać postacie", { variant: "warning" });
            }
        },
    });

    return (
        <Input.OuterWrapper onSubmit={handleSubmit}>
            <Input.InnerWrapper>
                <Input.Input
                    required
                    minLength="2"
                    maxLength="20"
                    pattern="[a-zA-ZąĄććęęłŁńŃóÓśŚżŻŹŹ ]+"
                    placeholder="Name..."
                    type="text"
                    ref={input}
                    {...getFieldProps("personName")}
                />
            </Input.InnerWrapper>
            <Input.InputWrapper>
                <Input.Input
                    minLength="2"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    placeholder="Email..."
                    type="text"
                    {...getFieldProps("personEmail")}
                />
            </Input.InputWrapper>

            <AddPersonButton />
            {!isResetFieldsHidden() && (
                <Input.ResetWrapper onClick={handleReset}>
                    <Input.DangerMessage>
                        <u> Reset Fields</u>
                    </Input.DangerMessage>
                </Input.ResetWrapper>
            )}
            {submitCount > 0 && !isEmpty(errors) && (
                <span className="AddPersonForm__error-message">
                    {JSON.stringify(errors, null, 2).substring(1, JSON.stringify(errors, null, 2).length - 1)}
                </span>
            )}
        </Input.OuterWrapper>
    );
};

const mapDispatchToProps = dispatch => ({
    showWarning: data => {
        dispatch(showWarning(data));
    },
    showError: data => {
        dispatch(showError(data));
    },
    hideAddedUserMessage: () => {
        dispatch(hideAddedUserMessage());
    },
    submitFigure: (notDuplicate, redirect, data, firebase) => {
        dispatch(submitFigure(notDuplicate, redirect, data, firebase));
    },
    toggleSubmit: () => {
        dispatch(toggleSubmit());
    },
});

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonForm);

AddPersonForm.propTypes = {
    onSubmit: PropTypes.func,
    submitFigure: PropTypes.func,
    showWarning: PropTypes.func,
    toggleSubmit: PropTypes.func,
    user: PropTypes.object,
    history: PropTypes.object,
    hideAddedUserMessage: PropTypes.func,
};
