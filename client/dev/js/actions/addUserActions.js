import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

export const getUsers = allUsers => ({
  type: Types.GET_ALL_USERS,
  allUsers
});

export const newGroupUsers = newUsers => ({
  type: Types.ADD_USERS_TO_GROUP,
  newUsers
});

export const getUserFailure = failure => ({
  type: Types.GET_ALL_USERS_FAILURE,
  failure
});

export const newGroupUsersFailure = failure => ({
  type: Types.ADD_USERS_TO_GROUP_FAILURE,
  failure
});

export const getAllUsers = token => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ALL_USERS_PATH, token)
    .then(
      (success) => {
        dispatch(getUsers(success));
      },
      (error) => {
        dispatch(getUserFailure(error));
      }
    );
};

export const addNewUsersToGroup = (token, data, groupId) => (dispatch) => {
  return api
  .postEndpoint(endpoints.ADD_USERS_TO_GROUP_PATH.replace(':id', `${groupId}`), data, token)
  .then(
    (success) => {
      dispatch(newGroupUsers(success));
    },
    (error) => {
      dispatch(newGroupUsersFailure(error));
    }
  );
};

