import Types from '../actions/actionTypes';


const inititalState = {
  createSuccess: false,
  getSuccess: false,
  newUser: {},
  users: []
};

const addUserReducer = (state = inititalState, action = {}) => {
  switch (action.type) {
    case Types.GET_ALL_USERS:
      return Object.assign({}, state, {
        users: action.allUsers.users,
        getSuccess: !!Object.keys(action.allUsers)
      });

    case Types.ADD_USERS_TO_GROUP:
      return action.newUsers;

    case Types.GET_ALL_USERS_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
        getSuccess: false
      });

    case Types.ADD_USERS_TO_GROUP_FAILURE:
      return Object.assign({}, state, {
        errors: action.failure,
      });

    default: return state;
  }
};

export default addUserReducer;
