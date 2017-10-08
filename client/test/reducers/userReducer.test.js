import Types from '../../dev/js/actions/actionTypes';
import userReducer from '../../dev/js/reducers/userReducer';

const initialState = {
  addSuccess: false,
  getSuccess: false,
  uploadSuccess: false,
  newUsers: [],
  users: [],
  updatedUser: {}
};

describe('User Reducer', () => {
  it('should get all registered users', () => {
    const action = {
      type: Types.GET_ALL_USERS,
      allUsers: { users: [], status: true }
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ users: [], getSuccess: true } });
  });

  it('should add users to group', () => {
    const action = {
      type: Types.ADD_USERS_TO_GROUP,
      newUsers: { addedUsers: [], status: true }
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ newUsers: [], addSuccess: true } });
  });

  it('should upload users profile image', () => {
    const action = {
      type: Types.UPLOAD_PROFILE_IMAGE,
      newUserImage: { success: '', status: true }
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ updatedUser: '', uploadSuccess: true } });
  });

  it('should handle error while getting all users', () => {
    const action = {
      type: Types.GET_ALL_USERS_FAILURE,
      failure: {}
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, getSuccess: false } });
  });

  it('should handle error while adding users to a group', () => {
    const action = {
      type: Types.ADD_USERS_TO_GROUP_FAILURE,
      failure: {}
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, addSuccess: false } });
  });

  it('should handle error while uploading a users image', () => {
    const action = {
      type: Types.UPLOAD_PROFILE_IMAGE_FAILURE,
      failure: {}
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ errors: {}, uploadSuccess: false } });
  });
});
