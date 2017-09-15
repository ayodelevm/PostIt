import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

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

export const forgotPassword = data => (dispatch) => {
  return api.postEndpoint(endpoints.FORGOT_PASSWORD, data)
    .then(
    (success) => {
      dispatch(forgotPasswordAction(success));
    },
    (error) => {
      dispatch(forgotPasswordFailure(error));
    }
  );
};

export const resetPassword = (token, data) => (dispatch) => {
  return api.updateEndpoint(`${endpoints.RESET_PASSWORD}?tok=${token}`, data)
    .then(
    (success) => {
      dispatch(resetPasswordAction(success));
    },
    (error) => {
      dispatch(resetPasswordFailure(error));
    }
  );
};
