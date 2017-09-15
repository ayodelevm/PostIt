import * as actions from '../../dev/js/actions/archiveActions';
import types from '../../dev/js/actions/actionTypes';

describe('archive actions', () => {
  it('should create an action for selected group details', () => {
    const groupDetails = [{ name: 'Learning' }];
    const expectedAction = {
      type: types.SELECT_GROUP_ID_TO_ARCHIVE,
      groupDetails
    };
    expect(actions.selectedGroupDetails(groupDetails)).toEqual(expectedAction);
  });

  it('should create an action when fetching all messages when archive is false', () => {
    const allMessages = { foundMessages: [{ name: 'Learning', description: '' }] };
    const expectedAction = {
      type: types.GET_ALL_MESSAGES_FOR_ARCHIVE,
      allMessages
    };
    expect(actions.getMessages(allMessages)).toEqual(expectedAction);
  });

  it('should create an action to get archived messages', () => {
    const archived = { foundMessages: [{ name: 'Learning', description: '' }] };
    const expectedAction = {
      type: types.GET_ARCHIVED_MESSAGES,
      archived
    };
    expect(actions.archivedMessages(archived)).toEqual(expectedAction);
  });

  it('should create an action to archive messages in a group', () => {
    const archiveSuccess = { foundMessages: [{ name: 'Learning', description: '' }] };
    const expectedAction = {
      type: types.ARCHIVE_MESSAGES,
      archiveSuccess
    };
    expect(actions.archive(archiveSuccess)).toEqual(expectedAction);
  });

  it('should create an action for failure when archiving messages', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.ARCHIVE_MESSAGES_FAILURE,
      failure
    };
    expect(actions.archiveFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting messages to archive', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_ALL_MESSAGES_FOR_ARCHIVE_FAILURE,
      failure
    };
    expect(actions.getMessagesFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting archived messages', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_ARCHIVED_MESSAGES_FAILURE,
      failure
    };
    expect(actions.archivedMessagesFailure(failure)).toEqual(expectedAction);
  });
});
