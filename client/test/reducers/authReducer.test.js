import Types from '../../dev/js/actions/actionTypes';
import authReducer from '../../dev/js/reducers/authReducer';

const initialState = {
  isVerified: false,
  isAuthenticated: false,
  currentUser: {}
};

describe('Auth Reducer', () => {
  it('should create a new user', () => {
    const action = {
      type: Types.CREATE_NEW_USER,
      newUser: { status: true, currentUser: {} }
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ currentUser: {}, isAuthenticated: true } });
  });

  it('should log a user in', () => {
    const action = {
      type: Types.LOGIN_USER,
      user: { status: true, currentUser: {} }
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ currentUser: {}, isAuthenticated: true } });
  });

  it('should sign a user up through google', () => {
    const action = {
      type: Types.GOOGLE_REGISTER,
      newUser: { status: true, currentUser: {} }
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ currentUser: {}, isAuthenticated: true } });
  });

  it('should sign a user in through google', () => {
    const action = {
      type: Types.GOOGLE_LOGIN,
      user: { status: true, currentUser: {} }
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ currentUser: {}, isAuthenticated: true } });
  });

  it('should set current user', () => {
    const action = {
      type: Types.SET_CURRENT_USER,
      currentUser: { status: true, currentUser: {} }
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ currentUser: {}, isAuthenticated: true } });
  });

  it('should set status of signup and signin network response', () => {
    const action = {
      type: Types.SET_RESPONSE,
      response: { status: true }
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ isVerified: true } });
  });

  it('should handle error while creating new user', () => {
    const action = {
      type: Types.CREATE_USER_FAILURE,
      failure: {}
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, isAuthenticated: false } });
  });

  it('should handle error while logging a user in', () => {
    const action = {
      type: Types.LOGIN_USER_FAILURE,
      failure: {}
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, isAuthenticated: false } });
  });

  it('should handle error while registering through google', () => {
    const action = {
      type: Types.GOOGLE_REGISTER_FAILURE,
      failure: {}
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, isAuthenticated: false } });
  });

  it('should handle error while signing in through google', () => {
    const action = {
      type: Types.GOOGLE_LOGIN_FAILURE,
      failure: {}
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, isAuthenticated: false } });
  });

  it('should handle error while setting current user fails', () => {
    const action = {
      type: Types.SET_CURRENT_USER_FAILURE,
      failure: {}
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, isAuthenticated: false } });
  });

  it('should log a user out', () => {
    const action = {
      type: Types.LOG_USER_OUT,
      successMessage: ''
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ successMessage: '', isAuthenticated: false } });
  });
});
