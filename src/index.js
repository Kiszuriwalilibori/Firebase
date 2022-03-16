import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Firebase, { FirebaseContext } from './contexts/firebaseContext';
import LandingPage from './components/LandingPage';
import reducer from './js/REDUX/reducer';
import * as serviceWorker from './serviceWorker';
import * as ROUTES from './js/routing/routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Awaiting from './components/Awaiting';

const Persons = lazy(() => import('./components/Persons'));
const Error = lazy(() => import('./components/Error'));
const Loader = lazy(() => import('./components/Loader'));

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Provider store={store}>
            <Router basename={process.env.PUBLIC_URL}>
                <main>
                    <Switch>
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route exact path={ROUTES.PERSONS} component={Awaiting(Persons)} />
                        <Route exact path={ROUTES.ERROR} component={Awaiting(Error)} />
                        <Route exact path={ROUTES.CONNECT} component={Awaiting(Loader)} />
                    </Switch>
                </main>
            </Router>
        </Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root'),
);

// function noConnection() {
//   const state = store.getState();
//   if (state.isError) { window.alert('Błąd połączenia albo zasób sieciowy nie jest dostępny'); }
// }
// store.subscribe(noConnection);

serviceWorker.register();
