import Types from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.CREATE_NEW_USER:
      return Object.assign({}, state, {
        user: action.newUser,
        isAuthenticated: !!Object.keys(action.newUser)
      });

    case Types.CREATE_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.errors,
        isAuthenticated: false
      });

    case Types.LOGIN_USER:
      return Object.assign({}, state, {
        user: action.user,
        isAuthenticated: !!Object.keys(action.user)
      });

    case Types.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.errors,
        isAuthenticated: false
      });

    case Types.LOG_USER_OUT:
      return Object.assign({}, state, {
        successMessage: action.successMessage,
        isAuthenticated: false
      });

    case Types.SET_CURRENT_USER:
      return Object.assign({}, state, {
        user: action.currentUser,
        isAuthenticated: !!Object.keys(action.currentUser).length
      });

    default: return state;
  }
};

export default authReducer;
