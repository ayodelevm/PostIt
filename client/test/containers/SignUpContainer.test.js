import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { SignUpContainer } from '../../dev/js/containers/SignUpContainer.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');
jest.mock('react-google-login');
jest.mock('react-notify-toast');

const setup = () => {
  const props = {
    createNewUser: jest.fn(() => Promise.resolve()),
    googleRegister: jest.fn(() => Promise.resolve()),
    signupResponse: { errors: { globals: 'invalid credentials' } },
  };

  const wrapper = mount(<SignUpContainer {...props} />);
  return {
    props,
    wrapper
  };
};

describe('login container', () => {
  const { props, wrapper } = setup();

  it('should render add sign up form', () => {
    expect(wrapper.find('SignUpForm').exists()).toEqual(true);
  });

  it('should notify on handle google response error', () => {
    const response = { error: 'SignUp Unsuccessful!' };
    wrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).not.toBeCalled();
  });

  it('should notify on handle google response error', () => {
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    wrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).toBeCalled();
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<SignUpContainer {...{ ...props, signupResponse: { isAuthenticated: true } }} />);
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    enzymeWrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).toHaveBeenCalled();
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<SignUpContainer {...{ ...props, signupResponse: { errors: { errors: 'E-mail already exist' } } }} />);
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    enzymeWrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).toHaveBeenCalled();
  });

  it('should call set setstate on input change', () => {
    wrapper.instance().handleChange(data.passwordEvent);
    expect(wrapper.state().password).toEqual('adeleke');
  });

  it('should delete errors from state', () => {
    wrapper.setState(data.errors);
    wrapper.instance().handleChange(data.passwordEvent);
    expect(wrapper.state().errors.password).toEqual(undefined);
    expect(wrapper.state().errors.passwordConfirmation).toEqual('this field is required');
  });

  it('should setState with error when validation failure', () => {
    wrapper.setState({ fullname: '' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(wrapper.state().errors.fullname).toEqual('This field is required');
  });

  it('should call createNewUser method', () => {
    wrapper.setState(data.stateData);
    wrapper.instance().handleFormSubmit(data.event);
    expect(props.createNewUser.mock.calls.length).toEqual(1);
  });

  it('should call createNewUser and notify onSuccess', () => {
    const enzymeWrapper = mount(<SignUpContainer {...{ ...props, signupResponse: { isAuthenticated: true } }} />);
    enzymeWrapper.setState(data.stateData);
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.createNewUser.mock.calls.length).toEqual(2);
  });

  it('should call createNewUser and notify onSuccess', () => {
    const enzymeWrapper = mount(<SignUpContainer {...{ ...props, signupResponse: { errors: { errors: 'invalid login credentials' } } }} />);
    enzymeWrapper.setState(data.stateData);
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.createNewUser.mock.calls.length).toEqual(3);
  });
});
