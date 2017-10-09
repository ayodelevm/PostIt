import Types from '../../dev/js/actions/actionTypes';
import messageReducer from '../../dev/js/reducers/messageReducer';

const initialState = {
  groupMessages: {},
  newMessage: {},
  getMessagesSuccess: false,
  newMessageSuccess: false
};

describe('User Reducer', () => {
  it('should get all messages in a group', () => {
    const action = {
      type: Types.GET_GROUP_AND_ITS_MESSAGES,
      groupMessages: { foundMessages: {}, status: true }
    };
    const newState = messageReducer(initialState, action);
    expect(newState).toEqual({ ...initialState,
      ...{ groupMessages: {}, getMessagesSuccess: true } });
  });

  it('should reset all current messages', () => {
    const action = {
      type: Types.SET_CURRENT_MESSAGES,
      mergedMessages: { currentMessages: {}, status: true }
    };
    const newState = messageReducer(initialState, action);
    expect(newState).toEqual({ ...initialState,
      ...{ groupMessages: {}, newMessageSuccess: true } });
  });

  it("should handle error while getting a group's messages", () => {
    const action = {
      type: Types.GET_GROUP_AND_ITS_MESSAGES_FAILURE,
      failure: {}
    };
    const newState = messageReducer(initialState, action);
    expect(newState).toEqual({ ...initialState,
      ...{ errors: {}, getMessagesSuccess: false } });
  });

  it('should handle error while creating a new message', () => {
    const action = {
      type: Types.CREATE_NEW_MESSAGES_FAILURE,
      failure: {}
    };
    const newState = messageReducer(initialState, action);
    expect(newState).toEqual({ ...initialState,
      ...{ errors: {}, newMessageSuccess: false } });
  });
});
