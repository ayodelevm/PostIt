import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/endpoints';

export const groupAndMessages = groupMessages => ({
  type: Types.GET_GROUP_AND_ITS_MESSAGES,
  groupMessages
});

export const groupMessagesFailure = failure => ({
  type: Types.GET_GROUP_AND_ITS_MESSAGES_FAILURE,
  failure
});

export const newGroupMessagesFailure = failure => ({
  type: Types.CREATE_NEW_MESSAGES_FAILURE,
  failure
});

export const successfulCreate = message => ({
  type: Types.SUCCESSFUL_MESSAGE_CREATE,
  message
});

export const setNewGroupMessages = mergedMessages => ({
  type: Types.SET_CURRENT_MESSAGES,
  mergedMessages
});

/**
 * Async action creators to get all messages in a group
 * @param {string} token
 * @param {number} groupId
 * @returns {function} dispatch
 */
export const getGroupMessages = (token, groupId) => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ONE_GROUP_AND_MESSAGES_PATH
  .replace(':id', `${groupId}`), token)
  .then(
    (success) => {
      const response = { ...success, ...{ status: !!Object.keys(success) } };
      dispatch(groupAndMessages(response));
    },
    (error) => {
      dispatch(groupMessagesFailure(error));
    }
  );
};

/**
 * Async action creators to create a new message
 * @param {string} token
 * @param {object} messagePayload
 * @param {number} groupId
 * @returns {function} dispatch
 */
export const createNewMessages = (token, messagePayload, groupId) => dispatch => api
  .postEndpoint(endpoints.POST_MESSAGES_PATH
  .replace(':id', `${groupId}`), messagePayload, token)
  .then(
    (success) => {
      dispatch(successfulCreate(success.success));
    },
    (error) => {
      dispatch(newGroupMessagesFailure(error));
    }
  );
