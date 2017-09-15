import * as actions from '../../dev/js/actions/groupActions';
import types from '../../dev/js/actions/actionTypes';

describe('group actions', () => {
  it("should create an action to get all of a user's groups", () => {
    const allGroups = { success: '', foundUserAndGroup: { id: '', username: '', Groups: [{ name: '' }, { name: '' }] } };
    const expectedAction = {
      type: types.GET_USER_GROUPS,
      allGroups
    };
    expect(actions.getGroups(allGroups)).toEqual(expectedAction);
  });

  it('should create an action to fetch all members of a group', () => {
    const grpUsers = { success: '', foundGroupAndUsers: { id: '', name: '', Users: [{ username: '' }, { username: '' }] } };
    const expectedAction = {
      type: types.GET_GROUP_USERS,
      grpUsers
    };
    expect(actions.groupUsers(grpUsers)).toEqual(expectedAction);
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

