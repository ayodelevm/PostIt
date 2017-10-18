import React from 'react';

import { mount } from 'enzyme';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import {
  MessageAreaContainer
} from '../../dev/js/containers/MessageAreaContainer.jsx';

window.localStorage = localStorageMock;

jest.mock('react-router-dom');
jest.mock('../../dev/js/containers/GroupFormContainer.jsx',
() => jest.fn().mockReturnValue(null));
jest.mock('../../dev/js/containers/UploadsContainer.jsx',
() => jest.fn().mockReturnValue(null));
jest.mock('../../dev/js/containers/Archive.jsx',
() => jest.fn().mockReturnValue(null));
jest.mock('../../dev/js/containers/NavContainer.jsx',
() => jest.fn().mockReturnValue(null));
jest.mock('../../dev/js/containers/MessageFormContainer.jsx',
() => jest.fn().mockReturnValue(null));
jest.mock('../../dev/js/containers/AddUsers.jsx',
() => jest.fn().mockReturnValue(null));

const setup = () => {
  const props = {
    match: { params: { id: 4 } },
    groupData: data.groupData,
    allUsersData: data.userData,
    currentUser: data.currentUser,
    archiveData: data.archiveData,
    groupMessages: data.messageData,
    getGroupMessages: jest.fn(() => Promise.resolve()),
    getGroupUsers: jest.fn(() => Promise.resolve()),
    selectedGroupDetails: jest.fn(),
    getArchivedMessages: jest.fn(),
    getUserGroups: jest.fn(() => Promise.resolve()),
    getAllUsers: jest.fn(() => Promise.resolve()),
    handleActiveGroupClicked: jest.fn()
  };

  const wrapper = mount(<MessageAreaContainer {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Given MessageAreaContainer component is mounted', () => {
  const { props, wrapper } = setup();

  it('should indicate that MessageArea component is rendered', () => {
    wrapper.setState({ redirect: false });
    expect(wrapper.find('MessageArea').exists()).toEqual(true);
  });

  it('should dispatch actions in componentDidMount when component mounts',
  () => {
    expect(props.getGroupMessages.mock.calls.length).toEqual(1);
    expect(props.getGroupUsers.mock.calls.length).toEqual(1);
    expect(props.getUserGroups.mock.calls.length).toEqual(1);
    expect(props.getAllUsers.mock.calls.length).toEqual(1);
  });

  it('should call handleActiveGroupClicked method when archive modal is opened',
  () => {
    wrapper.instance().handleActiveGroupClicked(data.event);
    expect(props.selectedGroupDetails.mock.calls.length).toEqual(1);
  });
});
