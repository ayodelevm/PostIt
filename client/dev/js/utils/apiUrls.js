const apiUrls = {
  BASE_PATH: `${window.location.protocol}//${window.location.host}`,
  SIGNUP_PATH: '/api/user/register',
  LOGIN_PATH: '/api/user/login',
  LOGOUT_PATH: '/api/user/logout',
  GET_ALL_GROUPS_PATH: '/api/groups',
  CREATE_GROUP_PATH: '/api/group',
  EDIT_ONE_GROUP_PATH: '/api/group/:id/edit',
  UPDATE_ONE_GROUP_PATH: '/api/group/:id/edit',
  DELETE_ONE_GROUP_PATH: '/api/group/delete',
  GET_ONE_GROUP_AND_MESSAGES_PATH: '/api/group/:id/messages',
  POST_MESSAGES_PATH: '/api/group/:id/message',
  GET_ALL_USERS_PATH: '/api/users',
  GET_GROUP_USERS_PATH: '/api/group/:id/users',
  ADD_USERS_TO_GROUP_PATH: '/api/group/:id/user',
  UPDATE_ONE_USER_PATH: '/api/user/:id/edit'
};

export default apiUrls;
