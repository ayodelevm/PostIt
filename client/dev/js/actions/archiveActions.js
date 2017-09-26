import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

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

export const getGroupWithMessages = (token, groupId) => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ONE_GROUP_AND_MESSAGES_PATH.replace(':id', `${groupId}`), token)
  .then(
    (success) => {
      dispatch(getMessages(success));
    },
    (error) => {
      dispatch(getMessagesFailure(error));
    }
  );
};

export const archiveMessages = (token, data, groupId) => (dispatch) => {
  return api.updateEndpoint(endpoints.ARCHIVE_MESSAGES.replace(':id', `${groupId}`), data, token)
  .then(
    (success) => {
      dispatch(archive(success));
    },
    (error) => {
      dispatch(archiveFailure(error));
    }
  );
};

export const getArchivedMessages = (token, groupId) => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ONE_GROUP_AND_MESSAGES_TRUE_PATH.replace(':id', `${groupId}`), token)
  .then(
    (success) => {
      dispatch(archivedMessages(success));
    },
    (error) => {
      dispatch(archivedMessagesFailure(error));
    }
  );
};
