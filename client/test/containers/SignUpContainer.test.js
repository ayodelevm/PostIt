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

describe('Given SignUpContainer component is mounted', () => {
  const { props, wrapper } = setup();

  it('should indicate that SignUpForm component is rendered', () => {
    expect(wrapper.find('SignUpForm').exists()).toEqual(true);
  });

  it('should return error from google when google signup button is clicked',
  () => {
    const response = { error: 'SignUp Unsuccessful!' };
    wrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).not.toBeCalled();
  });

  it('should return success from google when google login button is clicked',
  () => {
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    wrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).toBeCalled();
  });

  it('should return success when google login button is clicked', () => {
    const enzymeWrapper = mount(<SignUpContainer {...{
      ...props,
      signupResponse: { isAuthenticated: true } }
      } />);
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    enzymeWrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).toHaveBeenCalled();
  });

  it('should return error when google login button is clicked', () => {
    const enzymeWrapper = mount(<SignUpContainer {...{
      ...props,
      signupResponse: { errors: { errors: 'E-mail already exist' } } }
      } />);
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    enzymeWrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).toHaveBeenCalled();
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
    wrapper.setState({ fullname: '' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(wrapper.state().errors.fullname).toEqual('This field is required');
  });

  it('should call handleFormSubmit method when form is submitted', () => {
    wrapper.setState(data.stateData);
    wrapper.instance().handleFormSubmit(data.event);
    expect(props.createNewUser.mock.calls.length).toEqual(1);
  });

  it('should dispatch action and return success when form is submitted',
  () => {
    const enzymeWrapper = mount(<SignUpContainer {...{
      ...props,
      signupResponse: { isAuthenticated: true } }} />);
    enzymeWrapper.setState(data.stateData);
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.createNewUser.mock.calls.length).toEqual(2);
  });

  it('should dispatch action and return error when form is submitted', () => {
    const enzymeWrapper = mount(<SignUpContainer {...{
      ...props,
      signupResponse: { errors: {
        errors: 'invalid login credentials'
      } }
    }} />);
    enzymeWrapper.setState(data.stateData);
    enzymeWrapper.instance().handleFormSubmit(data.event);
    expect(props.createNewUser.mock.calls.length).toEqual(3);
  });
});
