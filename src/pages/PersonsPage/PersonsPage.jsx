import React, { useEffect, lazy, Suspense, useContext } from "react";
import { connect } from "react-redux";
import { Fade } from "@material-ui/core";

import { login, hideError } from "js/redux/actions";
import { loadData as load } from "thunks";
import { FirebaseContext } from "contexts/firebaseContext";
import { Application } from "styles/style";
import createRedirect from "js/functions/createRedirect";

import * as ROUTES from "js/routes";
import PersonsTableHeader from "./parts/PersonsTable/Header";

const AlertBox = lazy(() => import("./parts/Alert/Alert"));
const Loader = lazy(() => import("../ConnectingPage/ConnectingPage"));
const PersonsTableContent = lazy(() => import("./parts/PersonsTable/Body"));
const LoginSection = lazy(() => import("./parts/LoginSection"));
const PersonsTableSortArea = lazy(() => import("./parts/PersonsTable/SortArea"));
const UserInfoCard = lazy(() => import("./parts/UserCard"));
const MessageBox = lazy(() => import("./parts/Message"));

function PersonsPage(props) {
  const { isLoading, user, load, history } = props;
  const firebase = useContext(FirebaseContext);

  const redirect = React.useMemo(createRedirect(history), []);

  // const redirect = React.useMemo(
  //   () => ({
  //     error: () => {
  //       history.push(ROUTES.ERROR);
  //     },
  //     loading: () => {
  //       history.push(ROUTES.CONNECT);
  //     },
  //     home: () => {
  //       history.push(ROUTES.PERSONS);
  //     },
  //   }),
  //   [history]
  // );

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
export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);
