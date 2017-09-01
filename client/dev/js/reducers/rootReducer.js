import { combineReducers } from 'redux';

import authReducer from './authReducer';
import addUserReducer from './addUserReducer';
import groupReducer from './groupReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  authReducer,
  addUserReducer,
  groupReducer,
  messageReducer
});

export default rootReducer;
