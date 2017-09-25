import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

export const groupAndMessages = groupMessages => ({
  type: Types.GET_GROUP_AND_ITS_MESSAGES,
  groupMessages
});

export const newGroupMessages = newMessage => ({
  type: Types.CREATE_NEW_MESSAGES,
  newMessage
});

export const groupAndMessagesFailure = failure => ({
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

export const getGroupMessages = (token, groupId) => (dispatch) => {
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
      dispatch(successfulCreate(success.success));
    },
    (error) => {
      dispatch(newGroupMessagesFailure(error));
    }
  );
