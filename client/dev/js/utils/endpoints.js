const endpoints = {
  BASE_PATH: `${window.location.protocol}//${window.location.host}`,
  SIGNUP_PATH: '/api/v1/user/register',
  LOGIN_PATH: '/api/v1/user/login',
  LOGOUT_PATH: '/api/v1/user/logout',
  GET_ALL_GROUPS_PATH: '/api/v1/groups',
  CREATE_GROUP_PATH: '/api/v1/group',
  EDIT_ONE_GROUP_PATH: '/api/v1/group/:id/edit',
  UPDATE_ONE_GROUP_PATH: '/api/v1/group/:id/edit',
  DELETE_ONE_GROUP_PATH: '/api/v1/group/delete',
  GET_ONE_GROUP_AND_MESSAGES_PATH: '/api/v1/group/:id/messages?archived=false',
  GET_ONE_GROUP_AND_MESSAGES_TRUE_PATH: '/api/v1/group/:id/' +
  'messages?archived=true',
  POST_MESSAGES_PATH: '/api/v1/group/:id/message',
  GET_ALL_USERS_PATH: '/api/v1/users',
  GET_GROUP_USERS_PATH: '/api/v1/group/:id/users',
  ADD_USERS_TO_GROUP_PATH: '/api/v1/group/:id/user',
  UPDATE_ONE_USER_PATH: '/api/v1/user/:id/edit',
  ARCHIVE_MESSAGES: '/api/v1/group/:id/archivemessages',
  FORGOT_PASSWORD: '/api/v1/user/forgotpassword',
  RESET_PASSWORD: '/api/v1/resetpassword',
  GOOGLE_REGISTER: '/api/v1/user/googlesignup',
  GOOGLE_LOGIN: '/api/v1/user/googlelogin',
  VERIFY_USER: '/api/v1/verifyuser'
};

export default endpoints;
