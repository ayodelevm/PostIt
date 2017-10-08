import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../dev/js/actions/messageActions';
import types from '../../dev/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'kbdHJYCBu.85bireYIRb';

describe('message actions', () => {
  it("should create an action to get a group and it's messages", () => {
    const groupMessages = { success: '', foundMessages: { id: '', name: '', Messages: [{ message: '' }, { message: '' }] } };
    const expectedAction = {
      type: types.GET_GROUP_AND_ITS_MESSAGES,
      groupMessages
    };
    expect(actions.groupAndMessages(groupMessages)).toEqual(expectedAction);
  });

  it('should create an action when message has been created successfully', () => {
    const message = { success: '' };
    const expectedAction = {
      type: types.SUCCESSFUL_MESSAGE_CREATE,
      message
    };
    expect(actions.successfulCreate(message)).toEqual(expectedAction);
  });

  it('should create an action to set a users current message after creating a new message', () => {
    const mergedMessages = { foundMessages: { id: '', name: '', Messages: [{ message: '' }, { message: '' }] } };
    const expectedAction = {
      type: types.SET_CURRENT_MESSAGES,
      mergedMessages
    };
    expect(actions.setNewGroupMessages(mergedMessages)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting a group and its messages', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_GROUP_AND_ITS_MESSAGES_FAILURE,
      failure
    };
    expect(actions.groupMessagesFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when creating a new message', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.CREATE_NEW_MESSAGES_FAILURE,
      failure
    };
    expect(actions.newGroupMessagesFailure(failure)).toEqual(expectedAction);
  });
});

describe('Message async actions', () => {

  it('should dispatch GET_GROUP_AND_ITS_MESSAGES', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'GET_GROUP_AND_ITS_MESSAGES', groupMessages: { success: '', status: true, foundMessages: {} } }
    ];
    fetchMock.get('*', { success: '', foundMessages: {} });
    return store.dispatch(actions.getGroupMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch SUCCESSFUL_MESSAGE_CREATE', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'SUCCESSFUL_MESSAGE_CREATE', message: '' }
    ];
    fetchMock.post('*', { success: '' });

    return store.dispatch(actions.createNewMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });
});

describe('Message async action errors', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should dispatch GET_GROUP_AND_ITS_MESSAGES_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'GET_GROUP_AND_ITS_MESSAGES_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.getGroupMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch CREATE_NEW_MESSAGES_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'CREATE_NEW_MESSAGES_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.createNewMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

