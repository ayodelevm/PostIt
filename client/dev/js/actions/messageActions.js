import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

export const groupAndMessages = grpMessages => ({
  type: Types.GET_GROUP_AND_ITS_MESSAGES,
  grpMessages
});

export const newGroupMessages = newMessages => ({
  type: Types.CREATE_NEW_MESSAGES,
  newMessages
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

export const getOneGroupWithMessages = () => (dispatch) => {
  api.getEndpoint(endpoints.GET_ONE_GROUP_AND_MESSAGES_PATH)
  .then(
    (success) => {
      dispatch(groupAndMessages(success));
    },
    (error) => {
      dispatch(groupAndMessagesFailure(error));
    }
  );
};

export const createNewMessages = data => (dispatch) => {
  api.postEndpoint(endpoints.POST_MESSAGES_PATH, data)
  .then(
    (success) => {
      dispatch(newGroupMessages(success));
    },
    (error) => {
      dispatch(newGroupMessagesFailure(error));
    }
  );
};
