import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import { UploadsContainer } from '../../dev/js/containers/UploadsContainer.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');
jest.mock('sha1');
jest.mock('react-notify-toast');
jest.mock('superagent');


const setup = () => {
  const props = {
    getUserGroups: jest.fn(() => Promise.resolve()),
    getAllUsers: jest.fn(() => Promise.resolve()),
    uploadProfileImage: jest.fn(() => Promise.resolve()),
    getGroupMessages: jest.fn(() => Promise.resolve()),
    socketConnect: jest.fn(() => Promise.resolve()),
    uploadResponse: { uploadSuccess: true },
    closeModalRoute: 'dashboard',
    groupId: 2,
    userId: 2
  };

  const wrapper = mount(<UploadsContainer {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Given UploadsContainer component is mounted', () => {
  const { props, wrapper } = setup();

  it('should indicate that LoginForm component is rendered', () => {
    expect(wrapper.find('UploadsModal').exists()).toEqual(true);
  });

  it('should call handleUploadFile when a user uploads a profile picture',
  () => {
    const files = ['newimage.jpg'];
    wrapper.instance().handleUploadFile(files);
    expect(props.uploadProfileImage).toBeCalled();
  });
});
