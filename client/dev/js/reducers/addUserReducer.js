import Types from '../actions/actionTypes';


const inititalState = {
  addSuccess: false,
  getSuccess: false,
  uploadSuccess: false,
  newUsers: [],
  users: [],
  updatedUser: {}
};

const addUserReducer = (state = inititalState, action = {}) => {
  switch (action.type) {
    case Types.GET_ALL_USERS:
      return Object.assign({}, state, {
        users: action.allUsers.users,
        getSuccess: !!Object.keys(action.allUsers.users)
      });

    case Types.ADD_USERS_TO_GROUP:
      return Object.assign({}, state, {
        newUsers: action.newUsers.addedUsers,
        addSuccess: !!Object.keys(action.newUsers.addedUsers)
      });

    case Types.UPLOAD_PROFILE_IMAGE:
      return Object.assign({}, state, {
        updatedUser: action.newUserImage,
        uploadSuccess: !!Object.keys(action.newUserImage)
      });

    case Types.GET_ALL_USERS_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        getSuccess: false
      });

    case Types.ADD_USERS_TO_GROUP_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        addSuccess: false
      });

    case Types.UPLOAD_PROFILE_IMAGE_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        uploadSuccess: false
      });

    default: return state;
  }
};

export default addUserReducer;
