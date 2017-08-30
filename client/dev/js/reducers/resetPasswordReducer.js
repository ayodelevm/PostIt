import Types from '../actions/actionTypes';

const initialState = {
  emailVerified: false,
  resetSuccess: false
};

const resetPasswordReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.FORGOT_PASSWORD:
      return Object.assign({}, state, {
        emailVerified: !!Object.keys(action.mailSuccess)
      });

    case Types.RESET_PASSWORD:
      return Object.assign({}, state, {
        resetSuccess: !!Object.keys(action.resetSuccess)
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
