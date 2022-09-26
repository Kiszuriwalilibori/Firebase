import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Firebase, { FirebaseContext } from "contexts/firebaseContext";
import reducer from "js/redux/reducer";
import * as serviceWorker from "../serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import App from "components/App";

import "styles/App.css";

const store = createStore(reducer, applyMiddleware(thunk));
const AppProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <App />
        </Router>
      </Provider>
    </FirebaseContext.Provider>
  );
};

//export type RootStateType = ReturnType<typeof store.getState>;

serviceWorker.register();

export default AppProvider;
