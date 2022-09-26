import React, { useEffect, lazy, Suspense, useContext } from "react";
import { connect } from "react-redux";
import { Fade } from "@material-ui/core";

import { login, hideError } from "js/redux/actions";
import { loadData as load } from "thunks";
import { FirebaseContext } from "contexts/firebaseContext";
import { Application } from "styles/style";

import * as ROUTES from "js/routes";
import PersonsTableHeader from "./parts/PersonsTable/PersonsTableHeader";

const AlertBox = lazy(() => import("./parts/Alert/Alert"));
const Loader = lazy(() => import("../ConnectingPage/ConnectingPage"));
const PersonsTableContent = lazy(() => import("./parts/PersonsTable/PersonsTableContent"));
const LoginSection = lazy(() => import("./parts/LoginSection"));
const PersonsTableSortArea = lazy(() => import("./parts/PersonsTable/PersonsTableSortArea"));
const UserInfoCard = lazy(() => import("./parts/UserInfoCard"));
const MessageBox = lazy(() => import("./parts/Message"));

function PrepareApp(props) {
  const { isLoading, user, load, history } = { ...props };
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
    [history]
  );

  useEffect(() => {
    if (redirect && firebase) {
      load(redirect, firebase);
    }
  }, [firebase, redirect, load]);

  return (
    <>
      <Suspense fallback={null}>
        <AlertBox />
        {user && <UserInfoCard user={user} />}
        <Loader visible={isLoading} />
        <Application.App>
          <LoginSection />
          <Fade in={true} timeout={2000}>
            <Application.TableWrapper>
              <PersonsTableHeader />
              <Application.Table>
                <PersonsTableSortArea />
                <PersonsTableContent />
              </Application.Table>
            </Application.TableWrapper>
          </Fade>
        </Application.App>
        <MessageBox />
      </Suspense>
    </>
  );
}

const mapStateToProps = state => ({
  isError: state.isError,
  errorMessage: state.errorMessage,
  isLoading: state.isLoading,
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return {
    login: data => dispatch(login(data)),
    hideError: () => dispatch(hideError()),
    load: (x, y) => dispatch(load(x, y)),
  };
}
const Persons = connect(mapStateToProps, mapDispatchToProps)(PrepareApp);

export default Persons;

/**
 * dograć towebp konwerter i TS
 */
