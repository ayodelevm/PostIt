import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


import authReducer from './authReducer';
import userReducer from './userReducer';
import groupReducer from './groupReducer';
import messageReducer from './messageReducer';
import archiveReducer from './archiveReducer';
import resetPasswordReducer from './resetPasswordReducer';

/**
 * Combining all reducers into a single reducer
 */
const rootReducer = combineReducers({
  authReducer,
  userReducer,
  groupReducer,
  messageReducer,
  archiveReducer,
  resetPasswordReducer,
  router: routerReducer
});

export default rootReducer;
