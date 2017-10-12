import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../dev/js/actions/resetPasswordActions';
import types from '../../dev/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'kbdHJYCBu.85bireYIRb';


describe('message actions', () => {
  it('should create action when reset password link has been sent successfully',
  () => {
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

  it('should create an action for failure if forgot password link not sent',
  () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.FORGOT_PASSWORD_FAILURE,
      failure
    };
    expect(actions.forgotPasswordFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure if reset password not successful',
  () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.RESET_PASSWORD_FAILURE,
      failure
    };
    expect(actions.resetPasswordFailure(failure)).toEqual(expectedAction);
  });
});

describe('Reset Password async actions', () => {
  it('should dispatch FORGOT_PASSWORD', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'FORGOT_PASSWORD', mailSuccess: { status: true } }
    ];
    fetchMock.post('*', { success: '' });
    return store.dispatch(actions.forgotPassword(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch RESET_PASSWORD', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'RESET_PASSWORD', resetSuccess: { status: true } }
    ];
    fetchMock.put('*', { success: '' });

    return store.dispatch(actions.resetPassword(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });
});

describe('Reset Password async action errors', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should dispatch FORGOT_PASSWORD_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'FORGOT_PASSWORD_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.forgotPassword(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch RESET_PASSWORD_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'RESET_PASSWORD_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.resetPassword(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

