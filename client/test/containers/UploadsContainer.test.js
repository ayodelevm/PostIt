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
    uploadResponse: {},
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

describe('uploads container', () => {
  const { props, wrapper } = setup();

  it('should find and render reset password form component', () => {
    expect(wrapper.find('UploadsModal').exists()).toEqual(true);
  });

  it('should call uploadProfileImage action', () => {
    const files = ['newimage.jpg'];
    wrapper.instance().handleUploadFile(files);
    expect(props.uploadProfileImage).toBeCalled();
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<UploadsContainer {...{
      ...props,
      uploadResponse: { uploadSuccess: true } }
      } />);
    const files = ['newimage.jpg'];
    enzymeWrapper.instance().handleUploadFile(files);
    expect(props.uploadProfileImage).toHaveBeenCalled();
  });
});
