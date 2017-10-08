import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
import * as data from '../__mocks__/mockData';
import { NavContainer } from '../../dev/js/containers/NavContainer.jsx';

window.localStorage = localStorageMock;
jest.mock('react-router-dom');
jest.mock('react-notify-toast');

const setup = () => {
  const props = {
    logoutAUser: jest.fn(() => Promise.resolve()),
    logoutAction: {},
  };

  const wrapper = mount(<NavContainer {...props} />);
  return {
    props,
    wrapper
  };
};

describe('message form container', () => {
  const { props, wrapper } = setup();

  it('should call logoutAUser method and render before auth', () => {
    wrapper.instance().handleLogout();
    expect(props.logoutAUser).toBeCalled();
  });

  it('should call logoutAUser method and render after auth', () => {
    const enzymeWrapper = mount(<NavContainer {...{ ...props, logoutAction: { isAuthenticated: true } }} />);
    enzymeWrapper.instance().handleLogout();
    expect(props.logoutAUser).toHaveBeenCalled();
  });
});
