import Types from '../../dev/js/actions/actionTypes';
import resetPasswordReducer from '../../dev/js/reducers/resetPasswordReducer';

const initialState = {
  emailVerified: false,
  resetSuccess: false
};

describe('User Reducer', () => {
  it('should indicate when email to reset password is sent', () => {
    const action = {
      type: Types.FORGOT_PASSWORD,
      mailSuccess: {}
    };
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ emailVerified: true } });
  });

  it('should indicate when password reset is successful', () => {
    const action = {
      type: Types.RESET_PASSWORD,
      resetSuccess: {}
    };
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ resetSuccess: true } });
  });

  it('should handle error when password reset email sending fails', () => {
    const action = {
      type: Types.FORGOT_PASSWORD_FAILURE,
      failure: {}
    };
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, emailVerified: false } });
  });

  it('should handle error when password reset fails', () => {
    const action = {
      type: Types.RESET_PASSWORD_FAILURE,
      failure: {}
    };
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, resetSuccess: false } });
  });
});
