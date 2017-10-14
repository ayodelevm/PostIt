import React from 'react';
import { mount } from 'enzyme';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { DashBoard } from '../../dev/js/containers/DashBoard.jsx';

jest.mock('react-router-dom');
jest.mock('../../dev/js/containers/GroupFormContainer.jsx');
jest.mock('../../dev/js/containers/UploadsContainer.jsx');
jest.mock('../../dev/js/containers/Archive.jsx');
jest.mock('../../dev/js/containers/NavContainer.jsx');

window.localStorage = localStorageMock;

const setup = () => {
  const props = {
    getUserGroupsResponse: data.groupData,
    getAllUsersResponse: data.userData,
    currentUser: data.currentUser,
    archiveData: data.archiveData,
    selectedGroupDetails: jest.fn(),
    getArchivedMessages: jest.fn(),
    getUserGroups: () => Promise.resolve(),
    getAllUsers: jest.fn(),
    handleActiveGroupClicked: jest.fn()
  };

  const wrapper = mount(<DashBoard {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Given Dashboard component is mounted', () => {
  const { props, wrapper } = setup();
  it('should indicate that DashboardArea component is rendered', () => {
    expect(wrapper.find('DashboardArea').exists()).toBe(true);
  });

  it('should call handleActiveGroupClicked method when archive modal is opened',
  () => {
    wrapper.instance().handleActiveGroupClicked(data.event);
    expect(props.selectedGroupDetails.mock.calls.length).toEqual(1);
  });
});
