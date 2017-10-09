import Types from '../actions/actionTypes';

const initialState = {
  emailVerified: false,
  resetSuccess: false
};

/**
 * Reducer hanlding password reset functions
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
const resetPasswordReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.FORGOT_PASSWORD:
      return Object.assign({}, state, {
        emailVerified: action.mailSuccess.status
      });

    case Types.RESET_PASSWORD:
      return Object.assign({}, state, {
        resetSuccess: action.resetSuccess.status
      });

    case Types.FORGOT_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        emailVerified: false
      });

    case Types.RESET_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        resetSuccess: false
      });

    default: return state;
  }
};

export default resetPasswordReducer;
