import React, { useEffect, lazy, Suspense, useContext } from "react";
import { connect } from "react-redux";
import { Fade } from "@material-ui/core";
import { useSnackbar } from "notistack";

import createRedirect from "js/functions/createRedirect";
import isOffline from "js/functions/isOffline";
import PersonsTableHeader from "./parts/PersonsTable/Header";

import { login, hideError } from "js/redux/actions";
import { loadData as load } from "thunks";
import { FirebaseContext } from "contexts/firebaseContext";
import { Application } from "styles/style";

const AlertBox = lazy(() => import("./parts/Alert/Alert"));
const Loader = lazy(() => import("../ConnectingPage/ConnectingPage"));
const PersonsTableContent = lazy(() => import("./parts/PersonsTable/Body"));
const LoginSection = lazy(() => import("./parts/LoginSection"));
const PersonsTableSortArea = lazy(() => import("./parts/PersonsTable/SortArea"));
const UserInfoCard = lazy(() => import("./parts/UserCard"));
const MessageBox = lazy(() => import("./parts/Message"));

function PersonsPage(props) {
  const { isLoading, user, load, history } = props;
  console.log("isLoading", isLoading);
  const firebase = useContext(FirebaseContext);
  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const redirect = React.useMemo(createRedirect(history), []);
  console.log(isOffline(), "isOffline");
  isOffline() && enqueueSnackbar("W tej chwili nie masz połączenia z interenetem. Popróbuj później", { variant: "error" });
  isOffline() && redirect.landing();
  useEffect(() => {
    console.log(isOffline(), "offline from effect");
    if (isOffline()) {
      redirect.landing();
    } else {
      if (redirect && firebase) {
        load(redirect, firebase);
      }
    }
  }, [firebase, redirect, load]);

  return !isOffline() ? (
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
  ) : null;
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

/**
 * todo prawdoopodobnie przeszkadza ten  dziwaczny sposób na loader, to zasysa cały komponent connectingPage
 */
