const apiUrls = {
  BASE_PATH: `${window.location.protocol}//${window.location.host}`,
  SIGNUP_PATH: '/api/user/register',
  LOGIN_PATH: '/api/user/login',
  LOGOUT_PATH: '/api/user/logout',
  GET_ALL_GROUPS_PATH: '/api/groups',
  CREATE_GROUP_PATH: '/api/group',
  EDIT_ONE_GROUP: '/api/group/:id/edit',
  UPDATE_ONE_GROUP: '/api/group/:id/edit',
  DELETE_ONE_GROUP: '/api/group/delete',
  GET_ONE_GROUP_AND_MESSAGES: '/api/group/:id/messages',
  POST_MESSAGES: '/api/group/:id/message',
  GET_ALL_USERS: '/api/users',
  GET_GROUP_USERS: '/api/group/:id/users',
  ADD_USERS_TO_GROUP: '/api/group/:id/user'
};

export default apiUrls;
