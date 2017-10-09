import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { ForgotPassword } from '../../dev/js/containers/ForgotPassword.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');

const setup = () => {
  const props = {
    forgotPassword: jest.fn(() => Promise.resolve()),
    resetResponse: {},
  };

  const wrapper = mount(<ForgotPassword {...props} />);
  return {
    props,
    wrapper
  };
};

describe('forgot password container', () => {
  const { props, wrapper } = setup();

  it('should render add users modal', () => {
    expect(wrapper.find('ForgotPasswordModal').exists()).toEqual(true);
  });

  it('should call set setstate when handleResetState is called', () => {
    wrapper.instance().handleResetState();
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().errors).toEqual({});
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
    wrapper.setState({ email: '' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(wrapper.state().errors.email).toEqual('This field is required');
  });

  it('should call forgot password method', () => {
    wrapper.setState({ email: 'ayo@mail.com' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(props.forgotPassword.mock.calls.length).toEqual(1);
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<ForgotPassword {...{ ...props, resetResponse: { emailVerified: true } }} />);
    enzymeWrapper.setState({ email: 'ayo@mail.com' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.forgotPassword.mock.calls.length).toEqual(2);
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<ForgotPassword {...{ ...props, resetResponse: { errors: { errors: 'E-mail already exist' } } }} />);
    enzymeWrapper.setState({ email: 'ayo@mail.com' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.forgotPassword.mock.calls.length).toEqual(3);
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<ForgotPassword {...{ ...props, resetResponse: { errors: { globals: 'E-mail already exist' } } }} />);
    enzymeWrapper.setState({ email: 'ayo@mail.com' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.forgotPassword.mock.calls.length).toEqual(4);
  });
});
