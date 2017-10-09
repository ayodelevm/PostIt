import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../dev/js/actions/archiveActions';
import types from '../../dev/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'kbdHJYCBu.85bireYIRb';

describe('archive actions', () => {
  it('should create an action for selected group details', () => {
    const groupDetails = [{ name: 'Learning' }];
    const expectedAction = {
      type: types.SELECT_GROUP_ID_TO_ARCHIVE,
      groupDetails
    };
    expect(actions.selectedGroupDetails(groupDetails)).toEqual(expectedAction);
  });

  it('should create an action when fetching all messages when archive is false', () => {
    const messages = { foundMessages: [{ name: 'Learning', description: '' }] };
    const expectedAction = {
      type: types.GET_ALL_MESSAGES_FOR_ARCHIVE,
      messages
    };
    expect(actions.getMessages(messages)).toEqual(expectedAction);
  });

  it('should create an action to get archived messages', () => {
    const archived = { foundMessages: [{ name: 'Learning', description: '' }] };
    const expectedAction = {
      type: types.GET_ARCHIVED_MESSAGES,
      archived
    };
    expect(actions.archivedMessages(archived)).toEqual(expectedAction);
  });

  it('should create an action to archive messages in a group', () => {
    const archiveSuccess = { foundMessages: [{ name: 'Learning', description: '' }] };
    const expectedAction = {
      type: types.ARCHIVE_MESSAGES,
      archiveSuccess
    };
    expect(actions.archive(archiveSuccess)).toEqual(expectedAction);
  });

  it('should create an action for failure when archiving messages', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.ARCHIVE_MESSAGES_FAILURE,
      failure
    };
    expect(actions.archiveFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting messages to archive', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_ALL_MESSAGES_FOR_ARCHIVE_FAILURE,
      failure
    };
    expect(actions.getMessagesFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting archived messages', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_ARCHIVED_MESSAGES_FAILURE,
      failure
    };
    expect(actions.archivedMessagesFailure(failure)).toEqual(expectedAction);
  });
});

describe('Archive async actions', () => {

  it('should dispatch GET_ALL_MESSAGES_FOR_ARCHIVE', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'GET_ALL_MESSAGES_FOR_ARCHIVE', messages: { foundMessages: {}, status: true } }
    ];
    fetchMock.get('*', { foundMessages: {} });
    return store.dispatch(actions.getGroupWithMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch GET_ARCHIVED_MESSAGES', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'GET_ARCHIVED_MESSAGES', archived: { foundMessages: {}, status: true } }
    ];
    fetchMock.get('*', { foundMessages: {} });

    return store.dispatch(actions.getArchivedMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch ARCHIVE_MESSAGES', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'ARCHIVE_MESSAGES', archiveSuccess: { status: true } }
    ];
    fetchMock.put('*', {});

    return store.dispatch(actions.archiveMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });
});

describe('Archive async action errors', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should dispatch GET_ALL_MESSAGES_FOR_ARCHIVE_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'GET_ALL_MESSAGES_FOR_ARCHIVE_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.getGroupWithMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch GET_ARCHIVED_MESSAGES_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'GET_ARCHIVED_MESSAGES_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.getArchivedMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch ARCHIVE_MESSAGES_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'ARCHIVE_MESSAGES_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.archiveMessages(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

