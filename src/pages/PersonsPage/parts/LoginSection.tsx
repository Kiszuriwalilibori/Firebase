import * as React from "react";

import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useCallback } from "react";
import isEmpty from "lodash/isEmpty";

import { FirebaseContext } from "contexts/firebaseContext";
import { Login } from "styles/style";
import { login, logout, showError } from "reduxware/actions";
import { AppDispatch, RootStateType } from "components/AppProvider";
import { ErrorType, FirebaseError, User } from "types";
import { Action } from "reduxware/actions";
import { LinkButton } from "../styles";

import * as ROUTES from "routes";

interface Props {
    user: User;
    login: (data: any) => void;
    logout: () => void;
    showError: Action;
}

const LoginSection = (props: Props) => {
    const navigate = useNavigate();
    const { user, login, logout, showError } = props;
    const firebase = React.useContext(FirebaseContext);

    const requestLogin = useCallback(() => {
        firebase.auth
            .signInWithPopup(firebase.provider)
            .then((result: any) => {
                login(result);
            })
            .catch((err: FirebaseError) => {
                showError({ errorMessage: err.message, isError: true });
                navigate(ROUTES.ERROR);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login, firebase]);

    const requestLogout = useCallback(() => {
        firebase.auth
            .signOut()
            .then((result: any) => {
                logout();
            })
            .catch((err: FirebaseError) => {
                showError({ errorMessage: err.message, isError: true });
                navigate(ROUTES.ERROR);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logout, firebase]);

    return (
        <Login.Wrapper aria-label="login area">
            <LinkButton disableFocusRipple size="large" disabled={isEmpty(user)} onClick={requestLogout}>
                Wyloguj się
            </LinkButton>
            <LinkButton disableFocusRipple size="large" disabled={!isEmpty(user)} onClick={requestLogin}>
                Zaloguj się kontem Google
            </LinkButton>
        </Login.Wrapper>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    login: (data: any) => dispatch(login(data)),
    logout: () => dispatch(logout()),
    showError: (err: ErrorType) => dispatch(showError(err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSection);
