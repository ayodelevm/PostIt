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

/**
 * Reducer hanlding group functions
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
const groupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.GET_USER_GROUPS:
      return Object.assign({}, state, {
        groups: action.groups.foundGroups,
        getGroupSuccess: action.groups.status
      });

    case Types.GET_GROUP_USERS:
      return Object.assign({}, state, {
        groupUsers: action.users.foundUsers,
        getGroupUsersSuccess: action.users.status
      });

    case Types.SET_CURRENT_GROUPS:
      return Object.assign({}, state, {
        groups: action.mergedGroups.currentGroups,
        createSuccess: action.mergedGroups.status,
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
