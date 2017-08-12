import jwtDecode from 'jwt-decode';
import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

export const createUser = newUser => ({
  type: Types.CREATE_NEW_USER,
  newUser
});

export const loginUser = user => ({
  type: Types.LOGIN_USER,
  user
});

export const createUserFailure = errors => ({
  type: Types.CREATE_USER_FAILURE,
  errors
});

export const loginUserFailure = errors => ({
  type: Types.LOGIN_USER_FAILURE,
  errors
});

export const logoutUser = successMessage => ({
  type: Types.LOG_USER_OUT,
  successMessage
});

export const setCurrentUser = user => ({
  type: Types.SET_CURRENT_USER,
  currentUser: user
});

export const createNewUser = data => dispatch => api.postEndpoint(endpoints.SIGNUP_PATH, data)
  .then(
  (success) => {
    const token = success.token;
    console.log(token);
    window.localStorage.setItem('token', token);
    dispatch(createUser(jwtDecode(token)));
  },
  (error) => {
    dispatch(createUserFailure(error));
  }
  ).catch((err) => {
    console.log('in catch');
    dispatch(createUserFailure(err.message));
  });

export const loginAUser = data => dispatch => api.postEndpoint(endpoints.LOGIN_PATH, data)
  .then(
    (success) => {
      const token = success.token;
      console.log(token);
      window.localStorage.setItem('token', token);
      dispatch(loginUser(jwtDecode(token)));
    },
    (error) => {
      dispatch(loginUserFailure(error));
    }
  ).catch((err) => {
    console.log('in catch');
    dispatch(loginUserFailure(err.message));
  });

export const logoutAUser = () => (dispatch) => {
  window.localStorage.removeItem('token');
  dispatch(logoutUser({ message: 'Logged out successfully!' }));
};

