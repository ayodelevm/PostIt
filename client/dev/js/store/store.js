import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { verifyUser } from '../actions/authActions';

import rootReducer from '../reducers/rootReducer';

export const history = createHistory();
const middleware = routerMiddleware(history);

const logger = createLogger();
const middlewareConditionals = (process.env.NODE_ENV === 'development') ?
composeWithDevTools(
  applyMiddleware(thunk, middleware, logger)
) : applyMiddleware(thunk, middleware);

const store = createStore(
  rootReducer,
  middlewareConditionals
);

if (window.localStorage.token) {
  const token = window.localStorage.token;
  store.dispatch(verifyUser({ token }, token));
}

export default store;
