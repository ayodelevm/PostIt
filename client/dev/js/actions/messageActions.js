import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

export const groupAndMessages = grpMessages => ({
  type: Types.GET_GROUP_AND_ITS_MESSAGES,
  grpMessages
});

export const newGroupMessages = newMessage => ({
  type: Types.CREATE_NEW_MESSAGES,
  newMessage
});

export const archiveMessages = archivedMessages => ({
  type: Types.ARCHIVE_MESSAGES,
  archivedMessages
});

export const groupAndMessagesFailure = failure => ({
  type: Types.GET_GROUP_AND_ITS_MESSAGES_FAILURE,
  failure
});

export const newGroupMessagesFailure = failure => ({
  type: Types.CREATE_NEW_MESSAGES_FAILURE,
  failure
});

export const archiveMessagesFailure = failure => ({
  type: Types.ARCHIVE_MESSAGES_FAILURE,
  failure
});

export const setNewGroupMessages = mergedMessages => ({
  type: Types.SET_CURRENT_MESSAGES,
  mergedMessages
});

export const getOneGroupWithMessages = (token, groupId) => (dispatch) => {
  return api.getEndpoint(endpoints.GET_ONE_GROUP_AND_MESSAGES_PATH.replace(':id', `${groupId}`), token)
  .then(
    (success) => {
      dispatch(groupAndMessages(success));
    },
    (error) => {
      dispatch(groupAndMessagesFailure(error));
    }
  );
};

export const createNewMessages = (token, data, groupId) => (dispatch, getState) => api
  .postEndpoint(endpoints.POST_MESSAGES_PATH.replace(':id', `${groupId}`), data, token)
  .then(
    (success) => {
      const previousState = getState();
      const { grpMessages } = previousState.messageReducer;

      const mergedMessages = grpMessages.Messages.concat(success.createdMessage);
      const currentMessages = { ...grpMessages,
        Messages: mergedMessages
      };
      dispatch(setNewGroupMessages(currentMessages));
    },
    (error) => {
      dispatch(newGroupMessagesFailure(error));
    }
  );
