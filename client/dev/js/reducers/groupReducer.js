import Types from '../actions/actionTypes';

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

const groupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.GET_USER_GROUPS:
      return Object.assign({}, state, {
        groups: action.allGroups.foundUserAndGroups,
        getGrpSuccess: !!Object.keys(action.allGroups)
      });

    case Types.GET_GROUP_USERS:
      return Object.assign({}, state, {
        grpUsers: action.grpUsers.foundGroupAndUsers,
        getGrpUsersSuccess: !!Object.keys(action.grpUsers)
      });

    case Types.SET_CURRENT_GROUPS:
      return Object.assign({}, state, {
        groups: action.mergedGroups,
        createSuccess: !!Object.keys(action.mergedGroups),
      });

    case Types.GET_USER_GROUPS_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        getGrpSuccess: false
      });

    case Types.GET_GROUP_USERS_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        getGrpUsersSuccess: false
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
