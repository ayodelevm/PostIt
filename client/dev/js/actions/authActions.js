import jwtDecode from 'jwt-decode';
import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/apiUrls';

export const createUser = newUser => ({
  type: Types.CREATE_NEW_USER,
  newUser
});

export const newGoogleRegister = newUser => ({
  type: Types.GOOGLE_REGISTER,
  newUser
});

export const newGoogleLogin = user => ({
  type: Types.GOOGLE_LOGIN,
  user
});

export const loginUser = user => ({
  type: Types.LOGIN_USER,
  user
});

export const createUserFailure = failure => ({
  type: Types.CREATE_USER_FAILURE,
  failure
});

export const newGoogleRegisterFailure = failure => ({
  type: Types.GOOGLE_REGISTER_FAILURE,
  failure
});

export const newGoogleLoginFailure = failure => ({
  type: Types.GOOGLE_LOGIN_FAILURE,
  failure
});

export const loginUserFailure = failure => ({
  type: Types.LOGIN_USER_FAILURE,
  failure
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
    window.localStorage.setItem('token', token);
    dispatch(createUser(jwtDecode(token)));
  },
  (error) => {
    dispatch(createUserFailure(error));
  }
  ).catch((err) => {
    dispatch(createUserFailure(err.message));
  });

export const googleRegister = data => dispatch => api.postEndpoint(endpoints.GOOGLE_REGISTER, data)
  .then(
  (success) => {
    const token = success.token;
    window.localStorage.setItem('token', token);
    dispatch(newGoogleRegister(jwtDecode(token)));
  },
  (error) => {
    dispatch(newGoogleRegisterFailure(error));
  }
  );

export const loginAUser = data => dispatch => api.postEndpoint(endpoints.LOGIN_PATH, data)
  .then(
    (success) => {
      const token = success.token;
      window.localStorage.setItem('token', token);
      dispatch(loginUser(jwtDecode(token)));
    },
    (error) => {
      dispatch(loginUserFailure(error));
    }
  ).catch((err) => {
    dispatch(loginUserFailure(err.message));
  });

export const googleLogin = data => dispatch => api.postEndpoint(endpoints.GOOGLE_LOGIN, data)
  .then(
    (success) => {
      const token = success.token;
      window.localStorage.setItem('token', token);
      dispatch(newGoogleLogin(jwtDecode(token)));
    },
    (error) => {
      dispatch(newGoogleLoginFailure(error));
    }
  );

export const logoutAUser = () => (dispatch) => {
  window.localStorage.removeItem('token');
  dispatch(logoutUser({ message: 'Logged out successfully!' }));
};

