import React from 'react';
import configureMockStore from 'redux-mock-store';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import { push } from 'react-router-redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import store from '../../dev/js/store/store';
import * as actions from '../../dev/js/actions/authActions';
import localStorageMock from '../__mocks__/localStorageMock';
import Routes from '../../dev/js/Routes.jsx';


window.localStorage = localStorageMock;
const history = createHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const newStore = mockStore(store);

const props = {
  status: { isVerified: true }
};

const MountOptions = {
  context: {
    router: {
      history: {
        createHref: (a, b) => {
        },
        push: () => {
        },
        replace: () => {
        }
      }
    }
  },
  childContextTypes: {
    router: PropTypes.object
  }
};

describe('Routes', () => {
  it('should call the components passed into route', () => {
    Promise.all(
      store.dispatch(actions.setCurrentUser({ fullname: '', id: 2, username: '' })),
      store.dispatch(actions.setResponse({ token: '' }))
    );
    window.localStorage.setItem('token', true);
    const wrapper = mount(<Provider store={store}><Router history={history}><Routes {...props} /></Router></Provider>);
    expect(wrapper.find('PrivateRoute').exists()).toEqual(true);
    expect(wrapper.find('PrivateRoute').prop('path')).toEqual('/dashboard');
    expect(wrapper.find('App').exists()).toEqual(true);
    expect(wrapper.find('Switch').exists()).toEqual(true);
    wrapper.update();
  });

  it('should call the components passed into route', () => {
    const wrapper = shallow(<Routes />);
    window.localStorage.setItem('token', 'hfjhdgkfjgEYWKJ8khger3fi');
    expect(wrapper.find('AuthProtected').exists()).toEqual(true);
  });
});

