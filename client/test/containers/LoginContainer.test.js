import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { LoginContainer } from '../../dev/js/containers/LoginContainer.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');
jest.mock('react-google-login');
jest.mock('react-notify-toast');
jest.mock(
  '../../dev/js/containers/ForgotPassword.jsx', () => 'ForgotPassword'
);

const setup = () => {
  const props = {
    loginAUser: jest.fn(() => Promise.resolve()),
    googleLogin: jest.fn(() => Promise.resolve()),
    loginResponse: { errors: { globals: 'invalid credentials' } },
    history: data.history,
  };

  const wrapper = mount(<LoginContainer {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Given LoginContainer component is mounted', () => {
  const { props, wrapper } = setup();

  it('should indicate that LoginForm component is rendered', () => {
    expect(wrapper.find('LoginForm').exists()).toEqual(true);
  });

  it('should return error from google when google login button is clicked',
  () => {
    const response = { error: 'Login Unsuccessful!' };
    wrapper.instance().handleGoogleResponse(response);
    expect(props.googleLogin).not.toBeCalled();
  });

  it('should return success from google when google login button is clicked',
  () => {
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    wrapper.instance().handleGoogleResponse(response);
    expect(props.googleLogin).toBeCalled();
  });

  it('should return success when google login button is clicked', () => {
    const enzymeWrapper = mount(<LoginContainer {...{
      ...props, loginResponse: { isAuthenticated: true }
    }} />);
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    enzymeWrapper.instance().handleGoogleResponse(response);
    expect(props.googleLogin).toHaveBeenCalled();
  });

  it('should return error when google login button is clicked', () => {
    const enzymeWrapper = mount(<LoginContainer {...{
      ...props,
      loginResponse: {
        errors: { errors: 'E-mail already exist' } }
    }} />);
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    enzymeWrapper.instance().handleGoogleResponse(response);
    expect(props.googleLogin).toHaveBeenCalled();
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

  it('should setState with error object when validation is not successful',
  () => {
    wrapper.setState({ userIdentifier: '' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(wrapper.state().errors.userIdentifier)
    .toEqual('This field is required');
  });

  it('should call handleFormSubmit method when form is submitted', () => {
    wrapper.setState({ userIdentifier: 'ayo@mail.com', password: 'ayo' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(props.loginAUser.mock.calls.length).toEqual(1);
  });

  it('should dispatch action and return success when form is submitted', () => {
    const enzymeWrapper = mount(<LoginContainer {...{
      ...props, loginResponse: { isAuthenticated: true }
    }} />);
    enzymeWrapper.setState({ userIdentifier: 'ayo@mail.com', password: 'ayo' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.loginAUser.mock.calls.length).toEqual(2);
  });

  it('should dispatch action and return error when form is submitted', () => {
    const enzymeWrapper = mount(<LoginContainer {...{
      ...props,
      loginResponse: {
        errors: { errors: 'invalid login credentials' } }
    }} />);
    enzymeWrapper
    .setState({ userIdentifier: 'ayo@mail.com', password: 'ayo' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.loginAUser.mock.calls.length).toEqual(3);
  });
});
