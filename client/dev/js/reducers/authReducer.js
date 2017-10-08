import Types from '../actions/actionTypes';

const initialState = {
  isVerified: false,
  isAuthenticated: false,
  currentUser: {}
};

/**
 * Reducer hanlding authentication functions
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.CREATE_NEW_USER:
      return Object.assign({}, state, {
        currentUser: action.newUser.currentUser,
        isAuthenticated: action.newUser.status
      });

    case Types.CREATE_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        isAuthenticated: false
      });

    case Types.LOGIN_USER:
      return Object.assign({}, state, {
        currentUser: action.user.currentUser,
        isAuthenticated: action.user.status
      });

    case Types.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        isAuthenticated: false
      });

    case Types.GOOGLE_REGISTER:
      return Object.assign({}, state, {
        currentUser: action.newUser.currentUser,
        isAuthenticated: action.newUser.status
      });

    case Types.GOOGLE_REGISTER_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        isAuthenticated: false
      });

    case Types.GOOGLE_LOGIN:
      return Object.assign({}, state, {
        currentUser: action.user.currentUser,
        isAuthenticated: action.user.status
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
        currentUser: action.currentUser.currentUser,
        isAuthenticated: action.currentUser.status
      });

    case Types.SET_CURRENT_USER_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        isAuthenticated: false
      });

    case Types.SET_RESPONSE:
      return Object.assign({}, state, {
        isVerified: action.response.status
      });

    default: return state;
  }
};

export default authReducer;
