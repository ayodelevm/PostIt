import * as actions from '../../dev/js/actions/resetPasswordActions';
import types from '../../dev/js/actions/actionTypes';

describe('message actions', () => {
  it('should create an action when reset password link has been sent successfully', () => {
    const mailSuccess = { success: '' };
    const expectedAction = {
      type: types.FORGOT_PASSWORD,
      mailSuccess
    };
    expect(actions.forgotPasswordAction(mailSuccess)).toEqual(expectedAction);
  });

  it('should create an action when reset password is successful', () => {
    const resetSuccess = { success: '' };
    const expectedAction = {
      type: types.RESET_PASSWORD,
      resetSuccess
    };
    expect(actions.resetPasswordAction(resetSuccess)).toEqual(expectedAction);
  });

  it('should create an action for failure if forgot password link not sent successfully', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.FORGOT_PASSWORD_FAILURE,
      failure
    };
    expect(actions.forgotPasswordFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure if reset password not successful', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.RESET_PASSWORD_FAILURE,
      failure
    };
    expect(actions.resetPasswordFailure(failure)).toEqual(expectedAction);
  });
});

