import Types from '../actions/actionTypes';

const initialState = {
  groupMessages: {},
  newMessage: {},
  getMessagesSuccess: false,
  newMessageSuccess: false
};

/**
 * Reducer hanlding message functions
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
const messageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.GET_GROUP_AND_ITS_MESSAGES:
      return Object.assign({}, state, {
        groupMessages: action.groupMessages.foundMessages,
        getMessagesSuccess: action.groupMessages.status
      });

    case Types.SET_CURRENT_MESSAGES:
      return Object.assign({}, state, {
        groupMessages: action.mergedMessages.currentMessages,
        newMessageSuccess: action.mergedMessages.status
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
