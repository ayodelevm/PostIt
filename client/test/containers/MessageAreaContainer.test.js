import React from 'react';

import { mount } from 'enzyme';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import {
  MessageAreaContainer
} from '../../dev/js/containers/MessageAreaContainer.jsx';

window.localStorage = localStorageMock;

jest.mock('react-router-dom');
jest.mock('../../dev/js/containers/GroupFormContainer.jsx');
jest.mock('../../dev/js/containers/UploadsContainer.jsx');
jest.mock('../../dev/js/containers/Archive.jsx');
jest.mock('../../dev/js/containers/NavContainer.jsx');
jest.mock('../../dev/js/containers/MessageFormContainer.jsx');
jest.mock('../../dev/js/containers/AddUsers.jsx');

const setup = () => {
  const props = {
    match: { params: { id: 4 } },
    groupData: data.groupData,
    allUsersData: data.userData,
    currentUser: data.currentUser,
    archiveData: data.archiveData,
    groupMessages: data.messageData,
    getGroupMessages: () => Promise.resolve(),
    getGroupUsers: jest.fn(() => Promise.resolve()),
    selectedGroupDetails: jest.fn(),
    getArchivedMessages: jest.fn(),
    getUserGroups: () => Promise.resolve(),
    getAllUsers: jest.fn(() => Promise.resolve()),
    handleActiveGroupClicked: jest.fn()
  };

  const wrapper = mount(<MessageAreaContainer {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Messaging Container', () => {
  const { props, wrapper } = setup();

  it('renders the message area container', () => {
    wrapper.setState({ redirect: false });
    expect(wrapper.find('MessageArea').exists()).toEqual(true);
  });

  it('should call componentDidMount', () => {
    const enzymeWrapper = mount(<MessageAreaContainer {...{
      ...props,
      ...{ groupMessages: {
        groupMessages: { Messages: [] },
        getMessagesSuccess: true } }
    }} />);
    expect(enzymeWrapper.find('MessageBoardIcons').exists()).toBe(true);
  });

  it('should call handleActiveGroupClicked', () => {
    wrapper.instance().handleActiveGroupClicked(data.event);
    expect(props.selectedGroupDetails.mock.calls.length).toEqual(1);
  });
});
