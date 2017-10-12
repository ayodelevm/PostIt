import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { ResetPassword } from '../../dev/js/containers/ResetPassword.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');

const setup = () => {
  const props = {
    resetPassword: jest.fn(() => Promise.resolve()),
    resetResponse: {},
    location: data.location
  };

  const wrapper = mount(<ResetPassword {...props} />);
  return {
    props,
    wrapper
  };
};

describe('forgot password container', () => {
  const { props, wrapper } = setup();

  it('should find and render reset password form component', () => {
    expect(wrapper.find('ResetPasswordForm').exists()).toEqual(true);
  });

  it('should not find reset password form when redirect is true', () => {
    wrapper.setState({ redirect: true });
    expect(wrapper.find('ResetPasswordForm').exists()).toEqual(false);
  });

  it('should call set setstate on input change', () => {
    wrapper.instance().handleChange(data.passwordEvent);
    expect(wrapper.state().password).toEqual('adeleke');
  });

  it('should delete errors from state', () => {
    wrapper.setState(data.errors);
    wrapper.instance().handleChange(data.passwordEvent);
    expect(wrapper.state().errors.password).toEqual(undefined);
    expect(wrapper.state().errors.passwordConfirmation)
    .toEqual('this field is required');
  });

  it('should setState with error when validation failure', () => {
    wrapper.setState({ password: '' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(wrapper.state().errors.password).toEqual('This field is required');
  });

  it('should call forgot password method', () => {
    wrapper.setState({ password: 'ayo', passwordConfirmation: 'ayo' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(props.resetPassword.mock.calls.length).toEqual(1);
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<ResetPassword {...{
      ...props, resetResponse: { resetSuccess: true }
    }} />);
    enzymeWrapper.setState({ password: 'ayo', passwordConfirmation: 'ayo' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.resetPassword.mock.calls.length).toEqual(2);
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<ResetPassword {...{
      ...props,
      resetResponse: { errors: { errors: "passwords don't match" } }
    }} />);
    enzymeWrapper.setState({ password: 'ayo', passwordConfirmation: 'ayo' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.resetPassword.mock.calls.length).toEqual(3);
  });

  it('should call handleFormSubmit and notify onSuccess', () => {
    const enzymeWrapper = mount(<ResetPassword {...{
      ...props,
      resetResponse: { errors: {
        globals: 'password change unsuccessful' } }
    }} />);
    enzymeWrapper.setState({ password: 'ayo', passwordConfirmation: 'ayo' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.resetPassword.mock.calls.length).toEqual(4);
  });
});
