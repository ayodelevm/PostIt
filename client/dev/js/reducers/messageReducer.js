import Types from '../actions/actionTypes';

const intialState = {
  grpMessages: {},
  newMessage: {},
  getMessagesSuccess: false,
  newMessageSuccess: false
};

const messageReducer = (state = intialState, action = {}) => {
  switch (action.type) {
    case Types.GET_GROUP_AND_ITS_MESSAGES:
      return Object.assign({}, state, {
        grpMessages: action.grpMessages.found,
        getMessagesSuccess: !!Object.keys(action.grpMessages)
      });

    case Types.CREATE_NEW_MESSAGES:
      return Object.assign({}, state, {
        newMessage: action.newMessage.found,
        newMessageSuccess: !!Object.keys(action.newMessage)
      });
    
    case Types.SET_CURRENT_MESSAGES:
      return Object.assign({}, state, {
        grpMessages: action.mergedMessages,
        newMessageSuccess: !!Object.keys(action.mergedMessages)
      });

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
