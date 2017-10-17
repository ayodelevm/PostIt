import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { ResetPassword } from '../../dev/js/containers/ResetPassword.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');
jest.mock('react-notify-toast');

const setup = () => {
  const props = {
    resetPassword: jest.fn(() => Promise.resolve()),
    resetResponse: { errors: { globals: 'password change unsuccessful' } },
    location: data.location
  };

  const wrapper = mount(<ResetPassword {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Given ResetPassword component is mounted', () => {
  const { props, wrapper } = setup();

  it('should indicate that ResetPasswordForm component is rendered', () => {
    expect(wrapper.find('ResetPasswordForm').exists()).toEqual(true);
  });

  it('should not render ResetPasswordForm when redirect is true', () => {
    wrapper.setState({ redirect: true });
    expect(wrapper.find('ResetPasswordForm').exists()).toEqual(false);
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
    wrapper.setState({ password: '' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(wrapper.state().errors.password).toEqual('This field is required');
  });

  it('should call handleFormSubmit method when form is submitted', () => {
    wrapper.setState({ password: 'ayo', passwordConfirmation: 'ayo' });
    wrapper.instance().handleFormSubmit(data.event);
    expect(props.resetPassword.mock.calls.length).toEqual(1);
  });

  it('should should setState when resetPassword action is successful',
  (done) => {
    const enzymeWrapper = mount(<ResetPassword {...{
      ...props, resetResponse: { resetSuccess: true }
    }} />);
    enzymeWrapper.setState({ password: 'ayo', passwordConfirmation: 'ayo' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    setImmediate(() => {
      expect(enzymeWrapper.state().redirect).toEqual(true);
      done();
    });
  });

  it('should setState with error object when resetPassword action fails',
  (done) => {
    const enzymeWrapper = mount(<ResetPassword {...{
      ...props,
      resetResponse: { errors: { errors: "passwords don't match" } }
    }} />);
    enzymeWrapper.setState({ password: 'ayo', passwordConfirmation: 'ayo' });
    enzymeWrapper.instance().handleFormSubmit(data.event);
    setImmediate(() => {
      expect(enzymeWrapper.state().errors).toEqual("passwords don't match");
      done();
    });
  });
});
