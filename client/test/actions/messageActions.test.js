import * as actions from '../../dev/js/actions/messageActions';
import types from '../../dev/js/actions/actionTypes';

describe('message actions', () => {
  it("should create an action to get a group and it's messages", () => {
    const grpMessages = { success: '', foundGroupAndMessages: { id: '', name: '', Messages: [{ message: '' }, { message: '' }] } };
    const expectedAction = {
      type: types.GET_GROUP_AND_ITS_MESSAGES,
      grpMessages
    };
    expect(actions.groupAndMessages(grpMessages)).toEqual(expectedAction);
  });

  it('should create an action to create new messages', () => {
    const newMessage = { success: '', foundGroupAndUsers: { id: '', GroupId: '', UserId: '' } };
    const expectedAction = {
      type: types.CREATE_NEW_MESSAGES,
      newMessage
    };
    expect(actions.newGroupMessages(newMessage)).toEqual(expectedAction);
  });

  it('should create an action when message has been created successfully', () => {
    const message = { success: '' };
    const expectedAction = {
      type: types.SUCCESSFUL_MESSAGE_CREATE,
      message
    };
    expect(actions.successfulCreate(message)).toEqual(expectedAction);
  });

  it('should create an action to set a users current message after creating a new message', () => {
    const mergedMessages = { foundGroupAndMessages: { id: '', name: '', Messages: [{ message: '' }, { message: '' }] } };
    const expectedAction = {
      type: types.SET_CURRENT_MESSAGES,
      mergedMessages
    };
    expect(actions.setNewGroupMessages(mergedMessages)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting a group and its messages', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_GROUP_AND_ITS_MESSAGES_FAILURE,
      failure
    };
    expect(actions.groupAndMessagesFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when creating a new message', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.CREATE_NEW_MESSAGES_FAILURE,
      failure
    };
    expect(actions.newGroupMessagesFailure(failure)).toEqual(expectedAction);
  });
});

