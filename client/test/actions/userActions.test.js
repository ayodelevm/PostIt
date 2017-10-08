import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../dev/js/actions/userActions';
import types from '../../dev/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'kbdHJYCBu.85bireYIRb';


describe('user actions', () => {
  it('should create an action to get all users', () => {
    const allUsers = { users: [{ id: '1', username: 'adeleke' }] };
    const expectedAction = {
      type: types.GET_ALL_USERS,
      allUsers
    };
    expect(actions.getUsers(allUsers)).toEqual(expectedAction);
  });

  it('should create an action to add users to group', () => {
    const newUsers = { addedUsers: [{ id: '1', username: 'adeleke' }] };
    const expectedAction = {
      type: types.ADD_USERS_TO_GROUP,
      newUsers
    };
    expect(actions.newGroupUsers(newUsers)).toEqual(expectedAction);
  });

  it('should create an action to add users to group', () => {
    const newUserImage = { updatedUser: [{ id: '1', username: 'adeleke' }] };
    const expectedAction = {
      type: types.UPLOAD_PROFILE_IMAGE,
      newUserImage
    };
    expect(actions.uploadImage(newUserImage)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting all users', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_ALL_USERS_FAILURE,
      failure
    };
    expect(actions.getUserFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when adding users to group', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.ADD_USERS_TO_GROUP_FAILURE,
      failure
    };
    expect(actions.newGroupUsersFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when uploading pictures', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.UPLOAD_PROFILE_IMAGE_FAILURE,
      failure
    };
    expect(actions.uploadImageFailure(failure)).toEqual(expectedAction);
  });
});

describe('User async actions', () => {

  it('should dispatch GET_ALL_USERS', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'GET_ALL_USERS', allUsers: { success: '', status: true, users: [] } }
    ];
    fetchMock.get('*', { success: '', users: [] });
    return store.dispatch(actions.getAllUsers(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch ADD_USERS_TO_GROUP', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'ADD_USERS_TO_GROUP', newUsers: { success: '', status: true, addedUsers: [] } }
    ];
    fetchMock.post('*', { success: '', addedUsers: [] });

    return store.dispatch(actions.addNewUsersToGroup(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch UPLOAD_PROFILE_IMAGE', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'UPLOAD_PROFILE_IMAGE', newUserImage: { success: '', status: true } }
    ];
    fetchMock.put('*', { success: '' });

    return store.dispatch(actions.uploadProfileImage(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });
});

describe('User async action errors', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should dispatch GET_ALL_USERS_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'GET_ALL_USERS_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.getAllUsers(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch ADD_USERS_TO_GROUP_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'ADD_USERS_TO_GROUP_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.addNewUsersToGroup(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch UPLOAD_PROFILE_IMAGE_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'UPLOAD_PROFILE_IMAGE_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.uploadProfileImage(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

