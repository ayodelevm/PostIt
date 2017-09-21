import Types from '../actions/actionTypes';

const initialState = {
  isVerified: false,
  isAuthenticated: false,
  currentUser: {}
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.CREATE_NEW_USER:
      return Object.assign({}, state, {
        currentUser: action.newUser,
        isAuthenticated: !!Object.keys(action.newUser)
      });

    case Types.CREATE_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        isAuthenticated: false
      });

    case Types.LOGIN_USER:
      return Object.assign({}, state, {
        currentUser: action.user,
        isAuthenticated: !!Object.keys(action.user)
      });

    case Types.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        isAuthenticated: false
      });

    case Types.GOOGLE_REGISTER:
      return Object.assign({}, state, {
        currentUser: action.newUser,
        isAuthenticated: !!Object.keys(action.newUser)
      });

    case Types.GOOGLE_REGISTER_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        isAuthenticated: false
      });

    case Types.GOOGLE_LOGIN:
      return Object.assign({}, state, {
        currentUser: action.user,
        isAuthenticated: !!Object.keys(action.user)
      });

    case Types.GOOGLE_LOGIN_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        isAuthenticated: false
      });

    case Types.LOG_USER_OUT:
      return Object.assign({}, state, {
        successMessage: action.successMessage,
        isAuthenticated: false
      });

    case Types.SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.currentUser,
        isAuthenticated: !!Object.keys(action.currentUser),
      });

    case Types.SET_CURRENT_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        isAuthenticated: false
      });

    case Types.SET_RESPONSE:
      return Object.assign({}, state, {
        isVerified: !!Object.keys(action.resp),
      });

    default: return state;
  }
};

export default authReducer;
