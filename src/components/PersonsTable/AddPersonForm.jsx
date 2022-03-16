import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { showError, hideAddedUserMessage, showWarning, toggleSubmit } from '../../js/REDUX/actions';
import * as ROUTES from '../../js/routing/routes';
import { useFormik } from 'formik';
import { Input } from '../../styles/style';
import submitFigure from '../../js/REDUX/THUNKS/submitFigure';
import AddPersonButton from './AddPersonButton';
import { FirebaseContext } from '../../contexts/firebaseContext';
import * as Yup from 'yup';

let AddPersonForm = props => {
    const input = useRef(null);
    const { user, history, submitFigure, showWarning, toggleSubmit } = props;
    const firebase = useContext(FirebaseContext);
    const redirect = React.useMemo(
        () => ({
            error: () => {
                history.push(ROUTES.ERROR);
            },
            loading: () => {
                history.push(ROUTES.CONNECT);
            },
            home: () => {
                history.push(ROUTES.PERSONS);
            },
        }),
        [history],
    );

    const isResetFieldsHidden = () => !!(values.personName === '' && values.personEmail === '');
    useEffect(() => input.current.focus(), [input]);

    const { values, handleSubmit, getFieldProps, handleReset, submitCount, errors } = useFormik({
        initialValues: {
            personEmail: '',
            personName: '',
        },
        validationSchema: Yup.object().shape({
            personEmail: Yup.string().email('Invalid email address').required('Required'),
            personName: Yup.string()
                .min(4, 'Must be more than 3 characters')
                .required('Required')
                .matches('[a-zA-ZąĄććęęłŁńŃóÓśŚżŻŹŹ ]+', 'Invalid characters'),
        }),
        onSubmit() {
            if (user) {
                toggleSubmit();
                firebase.itemsRef
                    .orderByChild('email')
                    .equalTo(values.personEmail)
                    .once('value', snapshot => {
                        const isNotDuplicate = !snapshot.exists();

                        submitFigure(
                            isNotDuplicate,
                            redirect,
                            {
                                name: values.personName,
                                email: values.personEmail,
                                user: user.displayName || user.email,
                            },
                            firebase,
                        );
                    });
            } else {
                showWarning('Tylko zalogowani użytkownicy mogą dodawać postacie');
            }
        },
    });

    return (
        <Input.outerWrapper onSubmit={handleSubmit}>
            <Input.innerWrapper>
                <Input.input
                    required
                    minLength="2"
                    maxLength="20"
                    pattern="[a-zA-ZąĄććęęłŁńŃóÓśŚżŻŹŹ ]+"
                    placeholder="Name..."
                    type="text"
                    ref={input}
                    {...getFieldProps('personName')}
                />
            </Input.innerWrapper>
            <Input.inputWrapper>
                <Input.input
                    minLength="2"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    placeholder="Email..."
                    type="text"
                    {...getFieldProps('personEmail')}
                />
            </Input.inputWrapper>

            <AddPersonButton />
            {!isResetFieldsHidden() && (
                <Input.resetWrapper onClick={handleReset}>
                    <Input.dangerMessage>
                        <u> Reset Fields</u>
                    </Input.dangerMessage>
                </Input.resetWrapper>
            )}
            {submitCount > 0 && errors && (
                <span className="AddPersonForm__error-message">
                    {JSON.stringify(errors, null, 2).substring(1, JSON.stringify(errors, null, 2).length - 1)}
                </span>
            )}
        </Input.outerWrapper>
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

AddPersonForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPersonForm));

export default AddPersonForm;

AddPersonForm.propTypes = {
    onSubmit: PropTypes.func,
    submitFigure: PropTypes.func,
    showWarning: PropTypes.func,
    toggleSubmit: PropTypes.func,
    user: PropTypes.object,
    history: PropTypes.object,
    hideAddedUserMessage: PropTypes.func,
};
