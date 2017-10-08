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

describe('addUsers container', () => {
  const { props, wrapper } = setup();

  it('should render add users modal', () => {
    expect(wrapper.find('AddUsersModal').exists()).toEqual(true);
  });

  it('should call set setstate on chips change', () => {
    wrapper.instance().handleChange(['ayodapov', 'tundun']);
    expect(wrapper.state().members).toEqual(['ayodapov', 'tundun']);
  });

  it('should call set setstate when handleResetState is called', () => {
    wrapper.instance().handleResetState();
    expect(wrapper.state().members).toEqual([]);
    expect(wrapper.state().errors).toEqual({});
    expect(wrapper.state().createSuccess).toEqual(false);
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<AddUsers {...{ ...props, addUsersResponse: { ...props.addUsersResponse, ...{ addSuccess: true } } }} />);

    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.addNewUsersToGroup.mock.calls.length).toEqual(1);
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<AddUsers {...{ ...props, addUsersResponse: { ...props.addUsersResponse, ...{ errors: { globals: '' } } } }} />);

    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.addNewUsersToGroup.mock.calls.length).toEqual(2);
  });
});
