import React from 'react';
import { shallow } from 'enzyme';

import localStorageMock from '../__mocks__/localStorageMock';
import Routes from '../../dev/js/Routes.jsx';


window.localStorage = localStorageMock;

describe('Routes', () => {
  it('should indicate that the AuthProtected HOC exists', () => {
    const wrapper = shallow(<Routes />);
    window.localStorage.setItem('token', 'hfjhdgkfjgEYWKJ8khger3fi');
    expect(wrapper.find('AuthProtected').exists()).toEqual(true);
  });
});

