import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import {
  GroupFormContainer
} from '../../dev/js/containers/GroupFormContainer.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');
jest.mock('react-notify-toast');

const setup = () => {
  const props = {
    createNewGroup: jest.fn(() => Promise.resolve()),
    groupResponse: data.groupData,
    usersResponse: data.userData,
    currentUser: data.userData,
    groupMembers: data.groupData.groupUsers.Users,
    closeModalRoute: '/dashboard'
  };

  const wrapper = mount(<GroupFormContainer {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Given GroupFormContainer component is mounted', () => {
  const { props, wrapper } = setup();

  it('should indicate that GroupModal component is rendered', () => {
    expect(wrapper.find('GroupModal').exists()).toEqual(true);
  });

  it('should reset state when modal is closed', () => {
    wrapper.instance().handleResetState();
    expect(wrapper.state().name).toEqual('');
    expect(wrapper.state().description).toEqual('');
    expect(wrapper.state().members).toEqual([]);
    expect(wrapper.state().errors).toEqual({});
  });

  it('should set state on each input into form input field', () => {
    wrapper.instance().handleChange(data.passwordEvent);
    expect(wrapper.state().password).toEqual('adeleke');
  });

  it('should delete errors from state when a user corrects error in form input',
  () => {
    wrapper.setState(data.errors);
    wrapper.instance().handleChange(data.passwordEvent);
    expect(wrapper.state().errors.password).toEqual(undefined);
    expect(wrapper.state().errors.passwordConfirmation)
    .toEqual('this field is required');
  });

  it('should setState with members array when users to be added are selected',
  () => {
    wrapper.instance().handleChipsChange(['ayodapov', 'tundun']);
    expect(wrapper.state().members).toEqual(['ayodapov', 'tundun']);
  });

  it('should setState with error object when validation is not successful',
  () => {
    wrapper.setState({ name: '' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(wrapper.state().errors.name).toEqual('This field is required');
  });

  it('should dispatch createNewGroup action when form is submitted', () => {
    wrapper.setState({ name: 'learn python' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(props.createNewGroup.mock.calls.length).toEqual(1);
  });

  it('should reset state when createNewGroup action returns success',
  (done) => {
    const enzymeWrapper = mount(<GroupFormContainer {...{
      ...props,
      groupResponse: {
        ...props.groupResponse, createSuccess: true }
    }} />);
    enzymeWrapper
    .setState({ name: 'learn python', description: 'learn', members: ['2'] });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    setImmediate(() => {
      expect(enzymeWrapper.state().name).toEqual('');
      expect(enzymeWrapper.state().description).toEqual('');
      expect(enzymeWrapper.state().members).toEqual([]);
      done();
    });
  });

  it('should setState with error object when forgotPassword action returns error',
  (done) => {
    const enzymeWrapper = mount(<GroupFormContainer {...{
      ...props,
      groupResponse: {
        ...props.grnoupResponse,
        errors: { errors: 'name already exist' } }
    }} />);
    enzymeWrapper
    .setState({ name: 'learn python', description: '', members: [] });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    setImmediate(() => {
      expect(enzymeWrapper.state().errors).toEqual('name already exist');
      done();
    });
  });
});
