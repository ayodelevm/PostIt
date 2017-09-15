import Types from '../actions/actionTypes';

const intialState = {
  setGroupDetails: null,
  archivableMessages: {},
  getSuccess: false,
  archiveSuccess: false,
  archivedMessages: {},
  getArchivedSuccess: false
};

const archiveReducer = (state = intialState, action = {}) => {
  switch (action.type) {
    case Types.SELECT_GROUP_ID_TO_ARCHIVE:
      return Object.assign({}, state, {
        setGroupDetails: action.groupDetails,
      });

    case Types.GET_ALL_MESSAGES_FOR_ARCHIVE:
      return Object.assign({}, state, {
        archivableMessages: action.allMessages.foundGroupAndMessages,
        getSuccess: !!Object.keys(action.allMessages)
      });

    case Types.ARCHIVE_MESSAGES:
      return Object.assign({}, state, {
        archiveSuccess: !!Object.keys(action.archiveSuccess),
      });

    case Types.GET_ARCHIVED_MESSAGES:
      return Object.assign({}, state, {
        archivedMessages: action.archived.foundGroupAndMessages,
        getArchivedSuccess: !!Object.keys(action.archived)
      });

    case Types.ARCHIVE_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        archiveSuccess: false
      });

    case Types.GET_ALL_MESSAGES_FOR_ARCHIVE_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        getSuccess: false
      });

    case Types.GET_ARCHIVED_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        getArchivedSuccess: false
      });

    default: return state;
  }
};

export default archiveReducer;
