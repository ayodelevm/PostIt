import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/endpoints';

export const forgotPasswordAction = mailSuccess => ({
  type: Types.FORGOT_PASSWORD,
  mailSuccess
});

export const forgotPasswordFailure = failure => ({
  type: Types.FORGOT_PASSWORD_FAILURE,
  failure
});

export const resetPasswordAction = resetSuccess => ({
  type: Types.RESET_PASSWORD,
  resetSuccess
});

export const resetPasswordFailure = failure => ({
  type: Types.RESET_PASSWORD_FAILURE,
  failure
});

/**
 * Async action creators to handle sending email to server for verification and
 * sendning of link to reset password
 * @param {object} email
 * @returns {function} dispatch
 */
export const forgotPassword = email => (dispatch) => {
  return api.postEndpoint(endpoints.FORGOT_PASSWORD, email)
    .then(
    (success) => {
      const response = { status: !!Object.keys(success) };
      dispatch(forgotPasswordAction(response));
    },
    (error) => {
      dispatch(forgotPasswordFailure(error));
    }
  );
};

/**
 * Async action creator to reset a user's password
 * @param {string} token
 * @param {object} password
 * @returns {function} dispatch
 */
export const resetPassword = (token, password) => (dispatch) => {
  return api
    .updateEndpoint(`${endpoints.RESET_PASSWORD}?tok=${token}`, password)
    .then(
    (success) => {
      const response = { status: !!Object.keys(success) };
      dispatch(resetPasswordAction(response));
    },
    (error) => {
      dispatch(resetPasswordFailure(error));
    }
  );
};
