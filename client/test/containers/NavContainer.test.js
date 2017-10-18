import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize';

import localStorageMock from '../__mocks__/localStorageMock';
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

describe('Given NavContainer component is mounted', () => {
  const { props, wrapper } = setup();

  it('should dispatch logoutAUser action when a user logs out',
  () => {
    wrapper.instance().handleLogout();
    expect(props.logoutAUser).toBeCalled();
  });

  it("should switch nav's BeforeAuth component to AfterAuth component when user is authenticated",
  () => {
    const enzymeWrapper = mount(<NavContainer {...{
      ...props,
      logoutAction: { isAuthenticated: true }
    }} />);
    expect(enzymeWrapper.find('AfterAuth').exists()).toEqual(true);
    expect(enzymeWrapper.find('BeforeAuth').exists()).toEqual(false);
  });
});
