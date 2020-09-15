import * as React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { useCallback } from "react";
import { auth, provider } from "../js/FUNCTIONS/firebase";
import { Logo } from "../styles/style";
import { login, logout, showError } from "../js/ACTIONS/actions";
import * as ROUTES from "../js/ROUTES/routes";

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
      "0 0 1px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0, 0.6), 0 0 4px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.6),0 0 16px rgba(0,0,0,0.6)",

    "&:hover": {
      backgroundColor: "white",
      color: "#1E656D",
      borderColor: "303f4f",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "white",
      color: "#1E656D",
      borderColor: "303f4f",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
    "&:disabled": {
      backgroundColor: "DimGray",
      color: "DarkGray",
      boxShadow: "none",
      border: "none",
      cursor: "none",
    },
  },
})(Button);

const UnconnectedLoginSection = (props) => {
  const { user, login, logout, showError, history } = props;

  const requestLogin = useCallback(() => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        login(result);
      })
      .catch((err) => {
        showError(err.message);
        history.push(ROUTES.ERROR);
      });
  }, [login]);

  const requestLogout = useCallback(() => {
    auth
      .signOut()
      .then((result) => {
        logout();
      })
      .catch((err) => {
        showError(err.message);
        history.push(ROUTES.ERROR);
      });
  }, [logout]);

  const usr = user ? true : false;
  return (
    <Logo.wrapper>
      <LinkButton size="large" disabled={!usr} onClick={requestLogout}>
        Wyloguj się
      </LinkButton>
      <LinkButton size="large" disabled={usr} onClick={requestLogin}>
        Zaloguj się kontem Google
      </LinkButton>
    </Logo.wrapper>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
  logout: () => dispatch(logout()),
  showError: (code) => dispatch(showError(code)),
});
const LoginSection = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UnconnectedLoginSection)
);
export default LoginSection;