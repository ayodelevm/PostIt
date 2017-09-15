import * as actions from '../../dev/js/actions/userActions';
import types from '../../dev/js/actions/actionTypes';

describe('user actions', () => {
  it('should create an action to get all users', () => {
    const allUsers = { users: [{ id: '1', username: 'adeleke' }] };
    const expectedAction = {
      type: types.GET_ALL_USERS,
      allUsers
    };
    expect(actions.getUsers(allUsers)).toEqual(expectedAction);
  });

  it('should create an action to add users to group', () => {
    const newUsers = { addedUsers: [{ id: '1', username: 'adeleke' }] };
    const expectedAction = {
      type: types.ADD_USERS_TO_GROUP,
      newUsers
    };
    expect(actions.newGroupUsers(newUsers)).toEqual(expectedAction);
  });

  it('should create an action to add users to group', () => {
    const newUserImage = { updatedUser: [{ id: '1', username: 'adeleke' }] };
    const expectedAction = {
      type: types.UPLOAD_PROFILE_IMAGE,
      newUserImage
    };
    expect(actions.uploadImage(newUserImage)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting all users', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.GET_ALL_USERS_FAILURE,
      failure
    };
    expect(actions.getUserFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when adding users to group', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.ADD_USERS_TO_GROUP_FAILURE,
      failure
    };
    expect(actions.newGroupUsersFailure(failure)).toEqual(expectedAction);
  });

  it('should create an action for failure when uploading pictures', () => {
    const failure = { errors: {} };
    const expectedAction = {
      type: types.UPLOAD_PROFILE_IMAGE_FAILURE,
      failure
    };
    expect(actions.uploadImageFailure(failure)).toEqual(expectedAction);
  });
});

