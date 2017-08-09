import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

export const getGroups = allGroups => ({
  types: Types.GET_USER_GROUPS,
  allGroups
});

export const groupUsers = grpUsers => ({
  type: Types.GET_GROUP_USERS,
  grpUsers
});

export const createGroup = newGroup => ({
  types: Types.CREATE_GROUP,
  newGroup
});

export const updateGroup = updatedGroup => ({
  types: Types.EDIT_A_GROUP,
  updatedGroup
});

export const archiveGroup = archivedGroup => ({
  types: Types.ARCHIVE_A_GROUP,
  archivedGroup
});

export const getGroupsFailure = failure => ({
  types: Types.GET_USER_GROUPS_FAILURE,
  failure
});

export const groupUsersFailure = failure => ({
  type: Types.GET_GROUP_USERS_FAILURE,
  failure
});

export const createGroupFailure = failure => ({
  types: Types.createGroupFailure,
  failure
});

export const updateGroupFailure = failure => ({
  types: Types.EDIT_A_GROUP_FAILURE,
  failure
});

export const archiveGroupFailure = failure => ({
  types: Types.ARCHIVE_A_GROUP_FAILURE,
  failure
});

export const getAllGroups = () => (dispatch) => {
  api.getEndpoint(endpoints.GET_ALL_GROUPS_PATH)
  .then(
    (success) => {
      dispatch(getGroups(success));
    },
    (error) => {
      dispatch(getGroupsFailure(error));
    }
  );
};

export const getGroupUsers = () => (dispatch) => {
  api.getEndpoint(endpoints.GET_GROUP_USERS_PATH)
  .then(
    (success) => {
      dispatch(groupUsers(success));
    },
    (error) => {
      dispatch(groupUsersFailure(error));
    }
  );
};

export const createNewGroup = data => (dispatch) => {
  api.postEndpoint(endpoints.CREATE_GROUP_PATH, data)
  .then(
    (success) => {
      dispatch(createGroup(success));
    },
    (error) => {
      dispatch(createGroupFailure(error));
    }
  );
};

export const updateAGroup = data => (dispatch) => {
  api.updateEndpoint(endpoints.EDIT_ONE_GROUP_PATH, data)
  .then(
    (success) => {
      dispatch(updateGroup(success));
    },
    (error) => {
      dispatch(updateGroupFailure(error));
    }
  );
};
