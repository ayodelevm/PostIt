import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/endpoints';

export const selectedGroupDetails = groupDetails => ({
  type: Types.SELECT_GROUP_ID_TO_ARCHIVE,
  groupDetails
});

export const getMessages = messages => ({
  type: Types.GET_ALL_MESSAGES_FOR_ARCHIVE,
  messages
});

export const archivedMessages = archived => ({
  type: Types.GET_ARCHIVED_MESSAGES,
  archived
});

export const archive = archiveSuccess => ({
  type: Types.ARCHIVE_MESSAGES,
  archiveSuccess
});

export const archiveFailure = failure => ({
  type: Types.ARCHIVE_MESSAGES_FAILURE,
  failure
});

export const getMessagesFailure = failure => ({
  type: Types.GET_ALL_MESSAGES_FOR_ARCHIVE_FAILURE,
  failure
});

export const archivedMessagesFailure = failure => ({
  type: Types.GET_ARCHIVED_MESSAGES_FAILURE,
  failure
});

/**
 * Async action creators to get messages for archive
 * @param {string} token
 * @param {number} groupId
 * @returns {function} dispatch
 */
export const getGroupWithMessages = (token, groupId) => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ONE_GROUP_AND_MESSAGES_PATH
  .replace(':id', `${groupId}`), token)
  .then(
    (success) => {
      const response = { ...success, ...{ status: !!Object.keys(success) } };
      dispatch(getMessages(response));
    },
    (error) => {
      dispatch(getMessagesFailure(error));
    }
  );
};

/**
 * Async action creators to archive messages in a group
 * @param {string} token
 * @param {array} messageIds
 * @param {number} groupId
 * @returns {function} dispatch
 */
export const archiveMessages = (token, messageIds, groupId) => (dispatch) => {
  return api.updateEndpoint(endpoints.ARCHIVE_MESSAGES
  .replace(':id', `${groupId}`), messageIds, token)
  .then(
    (success) => {
      const response = { status: !!Object.keys(success) };
      dispatch(archive(response));
    },
    (error) => {
      dispatch(archiveFailure(error));
    }
  );
};

/**
 * Async action creators to get archived messages in a group
 * @param {string} token
 * @param {number} groupId
 * @returns {function} dispatch
 */
export const getArchivedMessages = (token, groupId) => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ONE_GROUP_AND_MESSAGES_TRUE_PATH
  .replace(':id', `${groupId}`), token)
  .then(
    (success) => {
      const response = { ...success, ...{ status: !!Object.keys(success) } };
      dispatch(archivedMessages(response));
    },
    (error) => {
      dispatch(archivedMessagesFailure(error));
    }
  );
};
