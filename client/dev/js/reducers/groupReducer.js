import Types from '../actions/actionTypes';

const initialState = {
  createSuccess: false,
  getGrpSuccess: false,
  getGrpUsersSuccess: false,
  editSuccess: false,
  archiveSuccess: false,
  newGroup: {},
  groups: []
};

const groupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.GET_USER_GROUPS:
      return Object.assign({}, state, {
        groups: action.allGroups.found,
        getGrpSuccess: !!Object.keys(action.allGroups)
      });

    case Types.GET_GROUP_USERS:
      return action.grpUsers;

    case Types.CREATE_GROUP:
      return Object.assign({}, state, {
        newGroup: action.newGroup,
        createSuccess: !!Object.keys(action.newGroup)
      });

    case Types.EDIT_A_GROUP:
      return action.updatedGroup;

    case Types.ARCHIVE_A_GROUP:
      return action.archivedGroup;

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

    case Types.EDIT_A_GROUP_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        editSuccess: false
      });

    case Types.ARCHIVE_A_GROUP_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        archiveSuccess: false
      });

    default: return state;
  }
};

export default groupReducer;
