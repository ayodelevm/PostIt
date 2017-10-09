import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

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

export const getUserGroups = token => (dispatch) => {
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

export const createNewGroup = (data, token) => (dispatch, getState) => {
  return api.postEndpoint(endpoints.CREATE_GROUP_PATH, data, token)
  .then(
    (success) => {
      const previousState = getState();
      const { groups } = previousState.groupReducer;

      const mergedGroups = groups.Groups.concat(success.newGroup);
      const currentGroups = { ...groups,
        Groups: mergedGroups
      };
      dispatch(setCurrentGroups(currentGroups));
    },
    (error) => {
      dispatch(createGroupFailure(error));
    }
  );
};
