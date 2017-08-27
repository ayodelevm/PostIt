import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from '../actions/authActions';

import authReducer from '../reducers/authReducer';
import addUserReducer from '../reducers/addUserReducer';
import groupReducer from '../reducers/groupReducer';
import messageReducer from '../reducers/messageReducer';

export const history = createHistory();
const middleware = routerMiddleware(history);

const logger = createLogger();

const store = createStore(
  combineReducers({
    authReducer,
    addUserReducer,
    groupReducer,
    messageReducer,
    router: routerReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk, middleware, logger)
  )
);

if (window.localStorage.token) {
  store.dispatch(setCurrentUser(jwtDecode(window.localStorage.token)));
}

export default store;
