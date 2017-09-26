import Types from '../actions/actionTypes';

const initialState = {
  createSuccess: false,
  getGroupSuccess: false,
  getGroupUsersSuccess: false,
  editSuccess: false,
  archiveSuccess: false,
  newGroup: {},
  groups: {},
  groupUsers: {}
};

const groupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.GET_USER_GROUPS:
      return Object.assign({}, state, {
        groups: action.groups.foundGroups,
        getGroupSuccess: !!Object.keys(action.groups)
      });

    case Types.GET_GROUP_USERS:
      return Object.assign({}, state, {
        groupUsers: action.users.foundUsers,
        getGroupUsersSuccess: !!Object.keys(action.users)
      });

    case Types.SET_CURRENT_GROUPS:
      return Object.assign({}, state, {
        groups: action.mergedGroups,
        createSuccess: !!Object.keys(action.mergedGroups),
      });

    case Types.GET_USER_GROUPS_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        getGroupSuccess: false
      });

    case Types.GET_GROUP_USERS_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        getGroupUsersSuccess: false
      });

    case Types.CREATE_GROUP_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        createSuccess: false
      });

    default: return state;
  }
};

export default groupReducer;
