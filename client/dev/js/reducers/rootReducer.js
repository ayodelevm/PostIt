import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


import authReducer from './authReducer';
import addUserReducer from './userReducer';
import groupReducer from './groupReducer';
import messageReducer from './messageReducer';
import archiveReducer from './archiveReducer';
import resetPasswordReducer from './resetPasswordReducer';


const rootReducer = combineReducers({
  authReducer,
  addUserReducer,
  groupReducer,
  messageReducer,
  archiveReducer,
  resetPasswordReducer,
  router: routerReducer
});

export default rootReducer;
