import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as api from '../../dev/js/utils/apis';
import * as actions from '../../dev/js/actions/groupActions';
import types from '../../dev/js/actions/actionTypes';

jest.mock('../__mocks__/apis');


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'kbdHJYCBu.85bireYIRb';

describe('group actions', () => {
  it("should create an action to get all of a user's groups", () => {
    const allGroups = { success: '', foundGroups: { id: '', username: '', Groups: [{ name: '' }, { name: '' }] } };
    const expectedAction = {
      type: types.GET_USER_GROUPS,
      allGroups
    };
    expect(actions.getGroups(allGroups)).toEqual(expectedAction);
  });

  it('should create an action to fetch all members of a group', () => {
    const users = { success: '', foundUsers: { id: '', name: '', Users: [{ username: '' }, { username: '' }] } };
    const expectedAction = {
      type: types.GET_GROUP_USERS,
      users
    };
    expect(actions.groupUsers(users)).toEqual(expectedAction);
  });

  it('should create an action to set a users current groups after creating a new group', () => {
    const mergedGroups = { foundUserAndGroup: { id: '', username: '', Groups: [{ name: '' }, { name: '' }] } };
    const expectedAction = {
      type: types.SET_CURRENT_GROUPS,
      mergedGroups
    };
    expect(actions.setCurrentGroups(mergedGroups)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting groups a user belongs to', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_USER_GROUPS_FAILURE,
      failure
    };
    expect(actions.getGroupsFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when fetching members of a group', () => {
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

  it('should dispatch GET_GROUP_USERS', () => {
    // fetch.mockResponse(JSON.stringify({ success: '', foundUsers: {} }));
    const store = mockStore({});
    const expectedActions = [
      { type: 'GET_GROUP_USERS', users: { success: '', foundUsers: {} } }
    ];
    fetchMock.get('*', { success: '', foundUsers: {} });

    return store.dispatch(actions.getGroupUsers(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    });
  });

  it('should dispathc GET_GROUP_SERS_FAILURE', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: 'GET_GROUP_USERS_FAILURE' }
    ];
    // Promise.reject(
      fetchMock.get('*', { response: 401 })
    // );
    // const response = await actions.getGroupUsers('*');
    // const data = await response.json().then(Promise.reject(expectedActions))

    return store.dispatch(actions.getGroupUsers(token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    },
    () => {
      expect(store.getActions()).toEqual(expectedActions);
      fetchMock.restore();
    }
  );
  });
});

