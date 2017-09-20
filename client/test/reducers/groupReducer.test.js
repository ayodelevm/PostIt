import Types from '../../dev/js/actions/actionTypes';
import groupReducer from '../../dev/js/reducers/groupReducer';

const initialState = {
  createSuccess: false,
  getGrpSuccess: false,
  getGrpUsersSuccess: false,
  editSuccess: false,
  archiveSuccess: false,
  newGroup: {},
  groups: {},
  grpUsers: {}
};

describe('User Reducer', () => {
  it('should get all groups a user belongs to', () => {
    const action = {
      type: Types.GET_USER_GROUPS,
      allGroups: { foundUserAndGroups: {} }
    };
    const newState = groupReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ groups: {}, getGrpSuccess: true } });
  });

  it('should get all users in a group', () => {
    const action = {
      type: Types.GET_GROUP_USERS,
      grpUsers: { foundGroupAndUsers: {} }
    };
    const newState = groupReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ grpUsers: {}, getGrpUsersSuccess: true } });
  });

  it('should reset all groups after creating a new group', () => {
    const action = {
      type: Types.SET_CURRENT_GROUPS,
      mergedGroups: {}
    };
    const newState = groupReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ groups: {}, createSuccess: true } });
  });

  it('should handle error while getting all a users group', () => {
    const action = {
      type: Types.GET_USER_GROUPS_FAILURE,
      failure: {}
    };
    const newState = groupReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, getGrpSuccess: false } });
  });

  it('should handle error while getting all users in a group', () => {
    const action = {
      type: Types.GET_GROUP_USERS_FAILURE,
      failure: {}
    };
    const newState = groupReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, getGrpUsersSuccess: false } });
  });

  it('should handle error while creating a new group', () => {
    const action = {
      type: Types.CREATE_GROUP_FAILURE,
      failure: {}
    };
    const newState = groupReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, createSuccess: false } });
  });
});
