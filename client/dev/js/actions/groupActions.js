import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/endpoints';

export const getGroups = groups => ({
  type: Types.GET_USER_GROUPS,
  groups
});

export const groupUsers = users => ({
  type: Types.GET_GROUP_USERS,
  users
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

export const setCurrentGroups = mergedGroups => ({
  type: Types.SET_CURRENT_GROUPS,
  mergedGroups
});

/**
 * Async action creators to get all groups a user belongs to
 * @param {string} token
 * @returns {function} dispatch
 */
export const getUserGroups = token => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ALL_GROUPS_PATH, token)
  .then(
    (success) => {
      const response = { ...success, ...{ status: !!Object.keys(success) } };
      dispatch(getGroups(response));
    },
    (error) => {
      dispatch(getGroupsFailure(error));
    }
  );
};

/**
 * Async action creators to get all the users in a group
 * @param {string} token
 * @param {number} groupId
 * @returns {function} dispatch
 */
export const getGroupUsers = (token, groupId) => (dispatch) => {
  return api.getEndpoint(endpoints.GET_GROUP_USERS_PATH
  .replace(':id', `${groupId}`), token)
  .then(
    (success) => {
      const response = { ...success, ...{ status: !!Object.keys(success) } };
      dispatch(groupUsers(response));
    },
    (error) => {
      dispatch(groupUsersFailure(error));
    }
  );
};

/**
 * Async action creators to create a new group
 * @param {object} groupPayload
 * @param {string} token
 * @returns {function} dispatch
 */
export const createNewGroup = (groupPayload, token) => {
  return (dispatch, getState) => {
    return api.postEndpoint(endpoints.CREATE_GROUP_PATH, groupPayload, token)
    .then(
      (success) => {
        const previousState = getState();
        const { groups } = previousState.groupReducer;

        const mergedGroups = groups.Groups.concat(success.newGroup);
        const currentGroups = { ...groups, Groups: mergedGroups };
        const response = {
          ...{ currentGroups },
          ...{ status: !!Object.keys(success) }
        };
        dispatch(setCurrentGroups(response));
      },
      (error) => {
        dispatch(createGroupFailure(error));
      }
    );
  };
};
