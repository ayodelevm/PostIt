import Types from '../actions/actionTypes';


const inititalState = {
  addSuccess: false,
  getSuccess: false,
  newUsers: [],
  users: []
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

    default: return state;
  }
};

export default addUserReducer;
