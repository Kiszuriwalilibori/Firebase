import * as React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { useCallback } from "react";
import { FirebaseContext } from "contexts/firebaseContext";

import { Logo } from "styles/style";
import { login, logout, showError } from "js/redux/actions";

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
    boxShadow: "0 0 1px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0, 0.6), 0 0 4px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.6),0 0 16px rgba(0,0,0,0.6)",

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

const LoginSection = props => {
  const { user, login, logout, showError, history } = props;
  const firebase = React.useContext(FirebaseContext);
  const requestLogin = useCallback(() => {
    firebase.auth
      .signInWithPopup(firebase.provider)
      .then(result => {
        login(result);
      })
      .catch(err => {
        showError(err.message);
        history.push(ROUTES.ERROR);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login, firebase]);

  const requestLogout = useCallback(() => {
    firebase.auth
      .signOut()
      .then(result => {
        logout();
      })
      .catch(err => {
        showError(err.message);
        history.push(ROUTES.ERROR);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout, firebase]);

  return (
    <Logo.Wrapper>
      <LinkButton size="large" disabled={!Boolean(user)} onClick={requestLogout}>
        Wyloguj się
      </LinkButton>
      <LinkButton size="large" disabled={Boolean(user)} onClick={requestLogin}>
        Zaloguj się kontem Google
      </LinkButton>
    </Logo.Wrapper>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
  logout: () => dispatch(logout()),
  showError: code => dispatch(showError(code)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginSection));

LoginSection.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
  showError: PropTypes.func,
};
