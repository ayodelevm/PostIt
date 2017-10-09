import Types from '../../dev/js/actions/actionTypes';
import archiveReducer from '../../dev/js/reducers/archiveReducer';

const initialState = {
  setGroupDetails: null,
  archivableMessages: {},
  getSuccess: false,
  archiveSuccess: false,
  archivedMessages: {},
  getArchivedSuccess: false
};

describe('User Reducer', () => {
  it('should get the id of group to be archived', () => {
    const action = {
      type: Types.SELECT_GROUP_ID_TO_ARCHIVE,
      groupDetails: {}
    };
    const newState = archiveReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ setGroupDetails: {} } });
  });

  it('should get all unarchived messages for archiving', () => {
    const action = {
      type: Types.GET_ALL_MESSAGES_FOR_ARCHIVE,
      messages: { foundMessages: {}, status: true }
    };
    const newState = archiveReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ archivableMessages: {}, getSuccess: true } });
  });

  it('should archive messages', () => {
    const action = {
      type: Types.ARCHIVE_MESSAGES,
      archiveSuccess: { status: true }
    };
    const newState = archiveReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ archiveSuccess: true } });
  });

  it('should get archived messages in a group', () => {
    const action = {
      type: Types.GET_ARCHIVED_MESSAGES,
      archived: { foundMessages: {}, status: true }
    };
    const newState = archiveReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ archivedMessages: {}, getArchivedSuccess: true } });
  });

  it('should handle error while getting unarchived messages', () => {
    const action = {
      type: Types.GET_ALL_MESSAGES_FOR_ARCHIVE_FAILURE,
      failure: {}
    };
    const newState = archiveReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, getSuccess: false } });
  });

  it('should handle error while archiveng messages', () => {
    const action = {
      type: Types.ARCHIVE_MESSAGES_FAILURE,
      failure: {}
    };
    const newState = archiveReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, archiveSuccess: false } });
  });

  it('should handle error while getting archived messages', () => {
    const action = {
      type: Types.GET_ARCHIVED_MESSAGES_FAILURE,
      failure: {}
    };
    const newState = archiveReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, getArchivedSuccess: false } });
  });
});
