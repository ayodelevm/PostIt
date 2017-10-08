import Types from '../actions/actionTypes';

const initialState = {
  setGroupDetails: null,
  archivableMessages: {},
  getSuccess: false,
  archiveSuccess: false,
  archivedMessages: {},
  getArchivedSuccess: false
};

/**
 * Reducer hanlding archive functions
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
const archiveReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SELECT_GROUP_ID_TO_ARCHIVE:
      return Object.assign({}, state, {
        setGroupDetails: action.groupDetails,
      });

    case Types.GET_ALL_MESSAGES_FOR_ARCHIVE:
      return Object.assign({}, state, {
        archivableMessages: action.messages.foundMessages,
        getSuccess: action.messages.status
      });

    case Types.ARCHIVE_MESSAGES:
      return Object.assign({}, state, {
        archiveSuccess: action.archiveSuccess.status
      });

    case Types.GET_ARCHIVED_MESSAGES:
      return Object.assign({}, state, {
        archivedMessages: action.archived.foundMessages,
        getArchivedSuccess: action.archived.status
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
