import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import jwtDecode from 'jwt-decode';
import rootReducer from '../reducers/rootReducer';
import { setCurrentUser } from '../actions/authActions';


const logger = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);

if (window.localStorage.token) {
  store.dispatch(setCurrentUser(jwtDecode(window.localStorage.token)));
}

export default store;
