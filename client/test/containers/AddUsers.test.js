import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { AddUsers } from '../../dev/js/containers/AddUsers.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');

const setup = () => {
  const props = {
    addNewUsersToGroup: jest.fn(() => Promise.resolve()),
    addUsersResponse: data.userData,
    closeModalRoute: '/dashboard',
    groupId: 2,
    groupMembers: data.groupData.groupUsers.Users
  };

  const wrapper = mount(<AddUsers {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Given AddUsers component is mounted', () => {
  const { props, wrapper } = setup();

  it('should indicate that AddUsersModal component is rendered', () => {
    expect(wrapper.find('AddUsersModal').exists()).toEqual(true);
  });

  it('should setState with users array when users to be added are selected',
  () => {
    wrapper.instance().handleChange(['ayodapov', 'tundun']);
    expect(wrapper.state().members).toEqual(['ayodapov', 'tundun']);
  });

  it('should reset state when modal is closed', () => {
    wrapper.instance().handleResetState();
    expect(wrapper.state().members).toEqual([]);
    expect(wrapper.state().errors).toEqual({});
    expect(wrapper.state().createSuccess).toEqual(false);
  });

  it('should call handleFormSubmit method when form is submitted', () => {
    const enzymeWrapper = mount(<AddUsers {...{
      ...props,
      addUsersResponse: {
        ...props.addUsersResponse,
        ...{ addSuccess: true } }
    }} />);

    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.addNewUsersToGroup.mock.calls.length).toEqual(1);
  });

  it('should dispatch action and return success when form is submitted',
  () => {
    const enzymeWrapper = mount(<AddUsers {...{
      ...props,
      addUsersResponse: {
        ...props.addUsersResponse,
        ...{ errors: { globals: '' } } }
    }} />);

    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.addNewUsersToGroup.mock.calls.length).toEqual(2);
  });
});
