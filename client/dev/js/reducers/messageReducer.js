import Types from '../actions/actionTypes';

const messageReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case Types.GET_GROUP_AND_ITS_MESSAGES:
      return action.grpMessages;

    case Types.CREATE_NEW_MESSAGES:
      return action.newMessages;

    case Types.ARCHIVE_MESSAGES:
      return action.archivedMessages;

    case Types.GET_GROUP_AND_ITS_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
      });

    case Types.CREATE_NEW_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
      });

    case Types.ARCHIVE_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
      });

    default: return state;
  }
};

export default messageReducer;
