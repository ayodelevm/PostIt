import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

export const getGroups = allGroups => ({
  type: Types.GET_USER_GROUPS,
  allGroups
});

export const groupUsers = grpUsers => ({
  type: Types.GET_GROUP_USERS,
  grpUsers
});

export const createGroup = newGroup => ({
  type: Types.CREATE_GROUP,
  newGroup
});

export const updateGroup = updatedGroup => ({
  type: Types.EDIT_A_GROUP,
  updatedGroup
});

export const archiveGroup = archivedGroup => ({
  type: Types.ARCHIVE_A_GROUP,
  archivedGroup
});

export const getGroupsFailure = failure => ({
  type: Types.GET_USER_GROUPS_FAILURE,
  failure
});

export const groupUsersFailure = failure => ({
  type: Types.GET_GROUP_USERS_FAILURE,
  failure
});

export const createGroupFailure = failure => ({
  type: Types.CREATE_GROUP_FAILURE,
  failure
});

export const updateGroupFailure = failure => ({
  type: Types.EDIT_A_GROUP_FAILURE,
  failure
});

export const archiveGroupFailure = failure => ({
  type: Types.ARCHIVE_A_GROUP_FAILURE,
  failure
});

// const token = window.localStorage.token;

export const getAllGroups = token => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ALL_GROUPS_PATH, token)
  .then(
    (success) => {
      dispatch(getGroups(success));
    },
    (error) => {
      dispatch(getGroupsFailure(error));
    }
  );
};

export const getGroupUsers = (token, groupId) => (dispatch) => {
  return api.getEndpoint(endpoints.GET_GROUP_USERS_PATH.replace(':id', `${groupId}`), token)
  .then(
    (success) => {
      dispatch(groupUsers(success));
    },
    (error) => {
      dispatch(groupUsersFailure(error));
    }
  );
};

export const createNewGroup = (data, token) => (dispatch) => {
  return api.postEndpoint(endpoints.CREATE_GROUP_PATH, data, token)
  .then(
    (success) => {
      dispatch(createGroup(success.newGroup));
    },
    (error) => {
      dispatch(createGroupFailure(error));
    }
  ).catch((err) => {
    dispatch(createGroupFailure(err.message));
  });
};

export const updateAGroup = (data, token) => (dispatch) => {
  return api.updateEndpoint(endpoints.EDIT_ONE_GROUP_PATH, data, token)
  .then(
    (success) => {
      dispatch(updateGroup(success));
    },
    (error) => {
      dispatch(updateGroupFailure(error));
    }
  );
};
