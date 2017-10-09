import 'isomorphic-fetch';
import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/endpoints';

export const getUsers = allUsers => ({
  type: Types.GET_ALL_USERS,
  allUsers
});

export const newGroupUsers = newUsers => ({
  type: Types.ADD_USERS_TO_GROUP,
  newUsers
});

export const uploadImage = newUserImage => ({
  type: Types.UPLOAD_PROFILE_IMAGE,
  newUserImage
});

export const getUserFailure = failure => ({
  type: Types.GET_ALL_USERS_FAILURE,
  failure
});

export const newGroupUsersFailure = failure => ({
  type: Types.ADD_USERS_TO_GROUP_FAILURE,
  failure
});

export const uploadImageFailure = failure => ({
  type: Types.UPLOAD_PROFILE_IMAGE_FAILURE,
  failure
});

/**
 * Async action creators to fetch all registered users
 * @param {string} token
 * @returns {function} dispatch
 */
export const getAllUsers = token => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ALL_USERS_PATH, token)
  .then(
    (success) => {
      const response = { ...success, ...{ status: !!Object.keys(success) } };
      dispatch(getUsers(response));
    },
    (error) => {
      dispatch(getUserFailure(error));
    }
  );
};

/**
 * Async action creators to add new users to a group
 * @param {string} token
 * @param {array} users
 * @param {number} groupId
 * @returns {function} dispatch
 */
export const addNewUsersToGroup = (token, users, groupId) => (dispatch) => {
  return api
  .postEndpoint(endpoints.ADD_USERS_TO_GROUP_PATH
  .replace(':id', `${groupId}`), users, token)
  .then(
    (success) => {
      const response = { ...success, ...{ status: !!Object.keys(success) } };
      dispatch(newGroupUsers(response));
    },
    (error) => {
      dispatch(newGroupUsersFailure(error));
    }
  );
};

/**
 * Async action creators to upload new profile picture
 * @param {string} token
 * @param {object} imageUrl
 * @param {number} userId
 * @returns {function} dispatch
 */
export const uploadProfileImage = (token, imageUrl, userId) => (dispatch) => {
  return api.updateEndpoint(endpoints.UPDATE_ONE_USER_PATH
  .replace(':id', `${userId}`), imageUrl, token)
  .then(
    (success) => {
      const response = { ...success, ...{ status: !!Object.keys(success) } };
      dispatch(uploadImage(response));
    },
    (error) => {
      dispatch(uploadImageFailure(error));
    }
  );
};
