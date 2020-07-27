import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { login, hideError } from "../js/ACTIONS/actions";
import { Fade } from "@material-ui/core";
import PersonsTableHeader from "./PersonsTable/PersonsTableHeader";
import { load } from "../js/THUNKS/loadData";
import { app_ } from "../styles/style";
import EmptyLoader from "./EmptyLoader";
import * as ROUTES from "../js/ROUTES/routes";
const AlertBox = lazy(() => import("./AlertBox"));
const Loader = lazy(() => import("./Loader"));
const PersonsTableContent = lazy(() =>
  import("./PersonsTable/PersonsTableContent")
);
const LoginSection = lazy(() => import("./LoginSection"));
const PersonsTableSortArea = lazy(() =>
  import("./PersonsTable/PersonsTableSortArea")
);
const UserInfoCard = lazy(() => import("./UserInfoCard"));
const MessageBox = lazy(() => import("./MessageBox"));

function _App(props) {
  const { isLoading, user, load, history } = { ...props };

  const redirect = React.useMemo(
    () => ({
      error: () => {
        history.push(ROUTES.ERROR);
      },
      loading: () => {
        history.push(ROUTES.CONNECT);
      },
      home: () => {
        history.push(ROUTES.HOME);
      },
    }),
    []
  );

  useEffect(() => {
    load(redirect);
  }, []);

  return (
    <React.Fragment>
      <Suspense fallback={EmptyLoader()}>
        <AlertBox />
        <UserInfoCard user={user} />
        <Loader visible={isLoading} />
        <app_.App>
          <LoginSection />
          <Fade in={true} timeout={2000}>
            <app_.tableWrapper>
              <PersonsTableHeader />
              <app_.table>
                <PersonsTableSortArea />
                <PersonsTableContent />
              </app_.table>
            </app_.tableWrapper>
          </Fade>
        </app_.App>
        <MessageBox />
      </Suspense>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isError: state.isError,
  errorMessage: state.errorMessage,
  isLoading: state.isLoading,
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(login(data)),
    hideError: () => dispatch(hideError()),
    load: (x) => dispatch(load(x)),
  };
}
const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
