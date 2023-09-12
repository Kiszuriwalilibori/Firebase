import * as React from "react";
import Button from "@material-ui/core/Button";

import { useNavigate } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useCallback } from "react";
import { FirebaseContext } from "contexts/firebaseContext";

import { Login } from "styles/style";
import { login, logout, showError } from "js/redux/actions";
import { AppDispatch, RootStateType } from "components/AppProvider";
import { FirebaseError, User } from "types/index";

import * as ROUTES from "../../../js/routes";

const LinkButton = withStyles({
    root: {
        transition: "0.5s ease-in-out",
        textTransform: "none",
        fontSize: 16,
        padding: "6px 12px",
        border: "1px solid",
        minWidth: "225px",
        lineHeight: 1.5,
        backgroundColor: "#1E656D",
        color: "white",
        borderColor: "303f4f",
        margin: "10px 0",
        boxShadow:
            "0 0 1px rgba(0,0,0,0.1), 0 0 2px rgba(0,0,0, 0.1), 0 0 4px rgba(0,0,0,0.1), 0 0 8px rgba(0,0,0,0.1),0 0 16px rgba(0,0,0,0.1)",

        "&:hover": {
            backgroundColor: "white",
            color: "#1E656D",
            borderColor: "#303f4f",
        },
        "&:active": {
            boxShadow: "none",
            backgroundColor: "white",
            color: "#1E656D",
            borderColor: "#303f4f",
        },
        "&:focus": {
            outline: "2px ridge #0ca4f6",
            outlineOffset: "1px",
            zIndex: 2000,
        },
        "&:disabled": {
            backgroundColor: "#474747",
            color: "#e0e0e0;",
            boxShadow: "none",
            border: "none",
            cursor: "none",
        },
    },
})(Button);

interface Props {
    user: User;
    login: (data: any) => void;
    logout: () => void;
    showError: (err: string) => void;
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
                showError(err.message);
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
                showError(err.message);
                navigate(ROUTES.ERROR);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logout, firebase]);

    return (
        <Login.Wrapper aria-label="login area">
            <LinkButton disableFocusRipple size="large" disabled={!Boolean(user)} onClick={requestLogout}>
                Wyloguj się
            </LinkButton>
            <LinkButton disableFocusRipple size="large" disabled={Boolean(user)} onClick={requestLogin}>
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
    showError: (err: string) => dispatch(showError(err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSection);
