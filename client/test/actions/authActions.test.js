import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../dev/js/actions/authActions';
import types from '../../dev/js/actions/actionTypes';
import localStorageMock from '../__mocks__/localStorageMock';

jest.mock('jwt-decode');

window.localStorage = localStorageMock;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'kbdHJYCBu.85bireYIRb';

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
    const response = { fullname: '', username: '' };
    const expectedAction = {
      type: types.SET_RESPONSE,
      response
    };
    expect(actions.setResponse(response)).toEqual(expectedAction);
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

describe('Auth async actions', () => {

  it('should dispatch create user actions on success', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'CREATE_NEW_USER', newUser: { currentUser: undefined, status: true } },
      { type: 'SET_RESPONSE', response: { currentUser: undefined, status: true } }
    ];
    fetchMock.post('*', { token: '' });
    return store.dispatch(actions.createNewUser(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch google register actions', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'GOOGLE_REGISTER', newUser: { currentUser: undefined, status: true } },
      { type: 'SET_RESPONSE', response: { currentUser: undefined, status: true } }
    ];
    fetchMock.post('*', { token: '' });

    return store.dispatch(actions.googleRegister(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch login user actions', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'LOGIN_USER', user: { currentUser: undefined, status: true } },
      { type: 'SET_RESPONSE', response: { currentUser: undefined, status: true } }
    ];
    fetchMock.post('*', { token: '' });

    return store.dispatch(actions.loginAUser(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch google login actions', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'GOOGLE_LOGIN', user: { currentUser: undefined, status: true } },
      { type: 'SET_RESPONSE', response: { currentUser: undefined, status: true } }
    ];
    fetchMock.post('*', { token: '' });

    return store.dispatch(actions.googleLogin(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch verify user actions', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'SET_CURRENT_USER', currentUser: { currentUser: undefined, status: true } },
      { type: 'SET_RESPONSE', response: { currentUser: undefined, status: true } }
    ];
    fetchMock.post('*', { token: '' });

    return store.dispatch(actions.verifyUser(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch logout actions', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'LOG_USER_OUT', successMessage: { message: 'Logged out successfully!' } },
    ];

    store.dispatch(actions.logoutAUser());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Auth async action errors', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should dispatch create user failure actions', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'CREATE_USER_FAILURE', failure: undefined },
      { type: 'SET_RESPONSE', response: { status: true } }
    ];
    return store.dispatch(actions.createNewUser(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch google register failure actions', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'GOOGLE_REGISTER_FAILURE', failure: undefined },
      { type: 'SET_RESPONSE', response: { status: true } }
    ];
    return store.dispatch(actions.googleRegister(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch login user failure', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'LOGIN_USER_FAILURE', failure: undefined },
      { type: 'SET_RESPONSE', response: { status: true } }
    ];
    return store.dispatch(actions.loginAUser(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch google login failure', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'GOOGLE_LOGIN_FAILURE', failure: undefined },
      { type: 'SET_RESPONSE', response: { status: true } }
    ];
    return store.dispatch(actions.googleLogin(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch verify user failure', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'SET_CURRENT_USER_FAILURE', failure: undefined },
      { type: 'SET_RESPONSE', response: { status: true } }
    ];
    return store.dispatch(actions.verifyUser(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

