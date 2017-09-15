import * as actions from '../../dev/js/actions/authActions';
import types from '../../dev/js/actions/actionTypes';

describe('auth actions', () => {
  it('should create an action fto create a new user', () => {
    const newUser = { fullname: '', username: '' };
    const expectedAction = {
      type: types.CREATE_NEW_USER,
      newUser
    };
    expect(actions.createUser(newUser)).toEqual(expectedAction);
  });

  it('should create an action to signup a user through google', () => {
    const newUser = { fullname: '', username: '' };
    const expectedAction = {
      type: types.GOOGLE_REGISTER,
      newUser
    };
    expect(actions.newGoogleRegister(newUser)).toEqual(expectedAction);
  });

  it('should create an action to login a user through google', () => {
    const user = { fullname: '', username: '' };
    const expectedAction = {
      type: types.GOOGLE_LOGIN,
      user
    };
    expect(actions.newGoogleLogin(user)).toEqual(expectedAction);
  });

  it('should create an action to login a user', () => {
    const user = { fullname: '', username: '' };
    const expectedAction = {
      type: types.LOGIN_USER,
      user
    };
    expect(actions.loginUser(user)).toEqual(expectedAction);
  });

  it('should create an action for failure when creating a new user', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.CREATE_USER_FAILURE,
      failure
    };
    expect(actions.createUserFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when registering through google', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GOOGLE_REGISTER_FAILURE,
      failure
    };
    expect(actions.newGoogleRegisterFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when loging in through google', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GOOGLE_LOGIN_FAILURE,
      failure
    };
    expect(actions.newGoogleLoginFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when loging in a user', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.LOGIN_USER_FAILURE,
      failure
    };
    expect(actions.loginUserFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when loging out a user', () => {
    const successMessage = { message: 'Logged out successfully!' };
    const expectedAction = {
      type: types.LOG_USER_OUT,
      successMessage
    };
    expect(actions.logoutUser(successMessage)).toEqual(expectedAction);
  });

  it('should create an action to set current user', () => {
    const user = { fullname: '', username: '' };
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      currentUser: user
    };
    expect(actions.setCurrentUser(user)).toEqual(expectedAction);
  });

  it('should create an action to check if user token verification is done', () => {
    const resp = { fullname: '', respname: '' };
    const expectedAction = {
      type: types.SET_RESPONSE,
      resp
    };
    expect(actions.setResponse(resp)).toEqual(expectedAction);
  });

  it('should create an action for failure when setting current user', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.SET_CURRENT_USER_FAILURE,
      failure
    };
    expect(actions.setCurrentUserFailure(failure)).toEqual(expectedAction);
  });
});
