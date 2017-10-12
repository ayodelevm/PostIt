import jwtDecode from 'jwt-decode';
import Types from './actionTypes';
import * as api from '../utils/apis';
import endpoints from '../utils/endpoints';

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

export const setResponse = response => ({
  type: Types.SET_RESPONSE,
  response
});

export const setCurrentUserFailure = failure => ({
  type: Types.SET_CURRENT_USER_FAILURE,
  failure
});

/**
 * Async action-creator to create new user
 * @param {object} userPayload
 * @returns {function} dispatch
 */
export const createNewUser = userPayload => dispatch => api
  .postEndpoint(endpoints.SIGNUP_PATH, userPayload)
  .then(
  (success) => {
    const token = success.token;
    window.localStorage.setItem('token', token);
    const response = {
      ...{ currentUser: jwtDecode(token) },
      ...{ status: !!Object.keys(success) }
    };
    dispatch(createUser(response));
    dispatch(setResponse(response));
  },
  (error) => {
    dispatch(createUserFailure(error));
    dispatch(setResponse({ ...error, status: true }));
  }
  );

/**
 * Async action creator to register through google
 * @param {object} googleIdToken
 * @returns {function} dispatch
 */
export const googleRegister = googleIdToken => dispatch => api
  .postEndpoint(endpoints.GOOGLE_REGISTER, googleIdToken)
  .then(
  (success) => {
    const token = success.token;
    window.localStorage.setItem('token', token);
    const response = {
      ...{ currentUser: jwtDecode(token) },
      ...{ status: !!Object.keys(success) }
    };
    dispatch(newGoogleRegister(response));
    dispatch(setResponse(response));
  },
  (error) => {
    dispatch(newGoogleRegisterFailure(error));
    dispatch(setResponse({ ...error, status: true }));
  }
  );

/**
 * Async action creator to login a user
 * @param {object} userPayload
 * @returns {function} dispatch
 */
export const loginAUser = userPayload => dispatch => api
  .postEndpoint(endpoints.LOGIN_PATH, userPayload)
  .then(
    (success) => {
      const token = success.token;
      window.localStorage.setItem('token', token);
      const response = {
        ...{ currentUser: jwtDecode(token) },
        ...{ status: !!Object.keys(success) }
      };
      dispatch(loginUser(response));
      dispatch(setResponse(response));
    },
    (error) => {
      dispatch(loginUserFailure(error));
      dispatch(setResponse({ ...error, status: true }));
    }
  );

/**
 * Async action creator to login a user through google
 * @param {object} googleIdToken
 * @returns {function} dispatch
 */
export const googleLogin = googleIdToken => dispatch => api
  .postEndpoint(endpoints.GOOGLE_LOGIN, googleIdToken)
  .then(
    (success) => {
      const token = success.token;
      window.localStorage.setItem('token', token);
      const response = {
        ...{ currentUser: jwtDecode(token) },
        ...{ status: !!Object.keys(success) }
      };
      dispatch(newGoogleLogin(response));
      dispatch(setResponse(response));
    },
    (error) => {
      dispatch(newGoogleLoginFailure(error));
      dispatch(setResponse({ ...error, status: true }));
    }
  );

/**
 * Async action creator to verify a user's token
 * @param {object} payload
 * @param {object} token
 * @returns {function} dispatch
 */
export const verifyUser = (payload, token) => dispatch => api
  .postEndpoint(endpoints.VERIFY_USER, payload, token)
  .then((success) => {
    const verifiedToken = success.token;
    window.localStorage.setItem('token', verifiedToken);
    const response = {
      ...{ currentUser: jwtDecode(verifiedToken) },
      ...{ status: !!Object.keys(success) }
    };
    dispatch(setCurrentUser(response));
    dispatch(setResponse(response));
  }, (error) => {
    window.localStorage.removeItem('token');
    dispatch(setCurrentUserFailure(error));
    dispatch(setResponse({ ...error, status: true }));
  });

/**
 * Action creator to a user out
 * @returns {function} dispatch
 */
export const logoutAUser = () => (dispatch) => {
  window.localStorage.removeItem('token');
  dispatch(logoutUser({ message: 'Logged out successfully!' }));
};

