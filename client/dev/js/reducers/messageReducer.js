import Types from '../actions/actionTypes';

const initialState = {
  grpMessages: {},
  newMessage: {},
  getMessagesSuccess: false,
  newMessageSuccess: false
};

const messageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.GET_GROUP_AND_ITS_MESSAGES:
      return Object.assign({}, state, {
        grpMessages: action.grpMessages.foundGroupAndMessages,
        getMessagesSuccess: !!Object.keys(action.grpMessages)
      });

    case Types.CREATE_NEW_MESSAGES:
      return Object.assign({}, state, {
        newMessage: action.newMessage.createdMessage,
        newMessageSuccess: !!Object.keys(action.newMessage)
      });
    
    case Types.SET_CURRENT_MESSAGES:
      return Object.assign({}, state, {
        grpMessages: action.mergedMessages,
        newMessageSuccess: !!Object.keys(action.mergedMessages)
      });

    case Types.GET_GROUP_AND_ITS_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        getMessagesSuccess: false
      });

    case Types.CREATE_NEW_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        newMessageSuccess: false
      });

    default: return state;
  }
};

export default messageReducer;
