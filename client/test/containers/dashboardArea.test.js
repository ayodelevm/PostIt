import React from 'react';
import configureMockStore from 'redux-mock-store';
import createHistory from 'history/createBrowserHistory';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import localStorageMock from '../__mocks__/localStorageMock';
import { DashBoard } from '../../dev/js/containers/DashBoard.jsx';
import DashboardArea from '../../dev/js/components/DashboardArea.jsx';

// const mountWithRouter = node => mount(<Router>{node}</Router>);
window.localStorage = localStorageMock;
const history = createHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  authReducer: { currentUser: { id: '' } },
  userReducer: { users: [] },
  groupReducer: { groups: { id: '', Groups: [] } },
  messageReducer: {},
  archiveReducer: {},
  resetPasswordReducer: {},
  router: {}
});

const props = {
  getUserGroupsResponse: { groups: { id: '', Groups: [] } },
  getAllUsersResponse: { users: [] },
  currentUser: { currentUser: { id: 4 } },
  archiveData: { archivedMessages: { Messages: [] } },
  selectedGroupDetails: jest.fn(),
  getArchivedMessages: jest.fn(),
  getUserGroups: () => { return Promise.resolve(); },
  getAllUsers: jest.fn()
};

describe('Dashboard Container', () => {
  it('renders the dashboard container', () => {
    const wrapper = mount(<Provider store={store}><Router history={history}><DashBoard {...props} /></Router></Provider>);
    expect(wrapper.find('DashboardArea').exists()).toBe(true);
  });
});
