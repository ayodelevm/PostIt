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

export const createUserFailure = createFailure => ({
  type: Types.CREATE_USER_FAILURE,
  errors: createFailure
});

export const loginUserFailure = loginFailure => ({
  type: Types.LOGIN_USER_FAILURE,
  errors: loginFailure
});
// export const createNewUser = data => dispatch => api.postEndpoint(endpoints.SIGNUP_PATH, data)
//   .then(payload => dispatch(createUser(payload)));

export const createNewUser = data => dispatch => api.postEndpoint(endpoints.SIGNUP_PATH, data)
      .then(
      (success) => {
        dispatch(createUser(success));
      },
      (error) => {
        console.log('in fetch');

        dispatch(createUserFailure(error)); 
}
  ).catch((err) => {
    console.log('in catch');
    dispatch(createUserFailure(err.message));
  });

export const loginAUser = data => dispatch => api.postEndpoint(endpoints.LOGIN_PATH, data)
  .then(
    (success) => {
      dispatch(loginUser(success));
    },
    (error) => {
      dispatch(loginUserFailure(error));
    }
  ).catch((err) => {
    dispatch(loginUserFailure(err.message));
  });

