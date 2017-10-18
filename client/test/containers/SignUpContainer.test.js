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

  it('should not dispatch googleRegister action when google verification fails',
  () => {
    const response = { error: 'SignUp Unsuccessful!' };
    wrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).not.toBeCalled();
  });

  it('should dispatch googleRegister action on successful google verification',
  () => {
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    wrapper.instance().handleGoogleResponse(response);
    expect(props.googleRegister).toBeCalled();
  });

  it('should set redirect in state when googleRegister action returns success',
  (done) => {
    const enzymeWrapper = mount(<SignUpContainer {...{
      ...props,
      signupResponse: { isAuthenticated: true } }
      } />);
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    enzymeWrapper.instance().handleGoogleResponse(response);
    setImmediate(() => {
      expect(enzymeWrapper.state().redirect).toEqual(true);
      done();
    });
  });

  it('should setState with error object when googleRegister action returns error',
  (done) => {
    const enzymeWrapper = mount(<SignUpContainer {...{
      ...props,
      signupResponse: { errors: { errors: 'E-mail already exist' } } }
      } />);
    const response = { tokenObj: { id_token: 'jldhvschHJKEVc' } };
    enzymeWrapper.instance().handleGoogleResponse(response);
    setImmediate(() => {
      expect(enzymeWrapper.state().errors).toEqual('E-mail already exist');
      done();
    });
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

  it('should setState with error object when validation fails',
  () => {
    wrapper.setState({ fullname: '' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(wrapper.state().errors.fullname).toEqual('This field is required');
  });

  it('should dispatch createNewUser action when form is submitted', () => {
    wrapper.setState(data.stateData);
    wrapper.instance().handleFormSubmit(data.event);
    expect(props.createNewUser.mock.calls.length).toEqual(1);
  });

  it('should should set redirect in state when createNewUser action returns success',
  (done) => {
    const enzymeWrapper = mount(<SignUpContainer {...{
      ...props,
      signupResponse: { isAuthenticated: true } }} />);
    enzymeWrapper.setState(data.stateData);
    enzymeWrapper.instance().handleFormSubmit(data.event);
    setImmediate(() => {
      expect(enzymeWrapper.state().redirect).toEqual(true);
      done();
    });
  });

  it('should setState with error object when createNewUser action returns error',
  (done) => {
    const enzymeWrapper = mount(<SignUpContainer {...{
      ...props,
      signupResponse: { errors: {
        errors: 'invalid login credentials'
      } }
    }} />);
    enzymeWrapper.setState(data.stateData);
    enzymeWrapper.instance().handleFormSubmit(data.event);
    setImmediate(() => {
      expect(enzymeWrapper.state().errors).toEqual('invalid login credentials');
      done();
    });
  });
});
