import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../dev/js/actions/groupActions';
import types from '../../dev/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'kbdHJYCBu.85bireYIRb';

describe('Group actions', () => {
  it("should create an action to get all of a user's groups", () => {
    const groups = {
      success: '',
      foundGroups: {
        id: '',
        username: '',
        Groups: [{ name: '' },
        { name: '' }] }
    };
    const expectedAction = {
      type: types.GET_USER_GROUPS,
      groups
    };
    expect(actions.getGroups(groups)).toEqual(expectedAction);
  });

  it('should create an action to fetch all members of a group', () => {
    const users = { success: '',
      foundUsers: { id: '',
        name: '',
        Users: [{ username: '' }, { username: '' }] }
    };
    const expectedAction = {
      type: types.GET_GROUP_USERS,
      users
    };
    expect(actions.groupUsers(users)).toEqual(expectedAction);
  });

  it('should create an action to set a users current groups after creating a new group', () => {
    const mergedGroups = {
      foundUserAndGroup: {
        id: '',
        username: '',
        Groups: [{ name: '' }, { name: '' }] }
    };
    const expectedAction = {
      type: types.SET_CURRENT_GROUPS,
      mergedGroups
    };
    expect(actions.setCurrentGroups(mergedGroups)).toEqual(expectedAction);
  });

  it(
    'should create an action for failure when getting groups a user belongs to',
  () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_USER_GROUPS_FAILURE,
      failure
    };
    expect(actions.getGroupsFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when fetching members of a group',
  () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_GROUP_USERS_FAILURE,
      failure
    };
    expect(actions.groupUsersFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when creating a new group', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.CREATE_GROUP_FAILURE,
      failure
    };
    expect(actions.createGroupFailure(failure)).toEqual(expectedAction);
  });
});

describe('Group async actions', () => {
  it('should dispatch GET_USER_GROUPS', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'GET_USER_GROUPS',
        groups: { success: '', status: true, foundGroups: {} }
      }
    ];
    fetchMock.get('*', { success: '', foundGroups: {} });
    return store.dispatch(actions.getUserGroups(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch GET_GROUP_USERS', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'GET_GROUP_USERS',
        users: { success: '', status: true, foundUsers: {} }
      }
    ];
    fetchMock.get('*', { success: '', foundUsers: {} });

    return store.dispatch(actions.getGroupUsers(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispatch SET_CURRENT_GROUPS', () => {
    const store = mockStore({
      groupReducer: {
        groups: { id: '', name: '', Groups: [] } }
    });
    const expectedActions = [
      {
        type: 'SET_CURRENT_GROUPS',
        mergedGroups: { currentGroups: {
          Groups: [{}], id: '', name: '' },
          status: true
        } }
    ];
    fetchMock.post('*', { success: '', newGroup: {} });

    return store.dispatch(actions.createNewGroup(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });
});

describe('Group async action errors', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should dispatch GET_USER_GROUPS_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'GET_USER_GROUPS_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.getUserGroups(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch GET_GROUP_USERS_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'GET_GROUP_USERS_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.getGroupUsers(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch CREATE_GROUP_FAILURE', () => {
    const store = mockStore({});
    fetch.mockReject();
    const expectedActions = [
      { type: 'CREATE_GROUP_FAILURE', failure: undefined }
    ];
    return store.dispatch(actions.createNewGroup(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

