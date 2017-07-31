import Types from '../actions/actionTypes';

const userReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case Types.CREATE_NEW_USER:
      return Object.assign(state, action.newUser);

    case Types.CREATE_USER_FAILURE:
      return Object.assign(state, action.errors);

    case Types.LOGIN_USER:
      return Object.assign(state, action.user);

    case Types.LOGIN_USER_FAILURE:
      return Object.assign(state, action.errors);

    default: return state;
  }
};

export default userReducer;
