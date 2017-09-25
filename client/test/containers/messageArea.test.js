import React from 'react';
import configureMockStore from 'redux-mock-store';
import createHistory from 'history/createBrowserHistory';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import localStorageMock from '../__mocks__/localStorageMock';
import { MessageAreaContainer } from '../../dev/js/containers/MessageAreaContainer.jsx';
import { Dashboard } from '../../dev/js/components/Dashboard.jsx';

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
  archiveReducer: { setGroupDetails: null },
  resetPasswordReducer: {},
  router: {}
});

const props = {
  match: { params: { id: 4 } },
  groupData: { groups: { id: '', Groups: [] }, groupUsers: { id: '', Users: [] } },
  allUsersData: { users: [] },
  currentUser: { currentUser: { id: 4 } },
  archiveData: { archivedMessages: { Messages: [] } },
  groupMessages: { groupMessages: { Messages: [] } },
  getGroupMessages: () => { return Promise.resolve(); },
  getGroupUsers: jest.fn(),
  selectedGroupDetails: jest.fn(),
  getArchivedMessages: jest.fn(),
  getUserGroups: () => { return Promise.resolve(); },
  getAllUsers: jest.fn(),
  handleActiveGroupClicked: jest.fn()
};

describe('Messaging Container', () => {
  // beforeEach(() => {
  //   const wrapper = mount(<Provider store={store}><Router history={history}><MessageAreaContainer {...props} /></Router></Provider>);
  // })

  it('renders the dashboard container', () => {
    const wrapper = mount(<Provider store={store}><Router history={history}><MessageAreaContainer {...props} /></Router></Provider>);
    expect(wrapper.find('MessagingComponent').exists()).toBe(true);
  });

  it('should call componentDidMount', () => {
    sinon.spy(MessageAreaContainer.prototype, 'componentDidMount');
    const wrapper = mount(<Provider store={store}><Router history={history}><MessageAreaContainer {...props} /></Router></Provider>);
    const currentState = wrapper.component.props.props.store.getState();
    const componentProps = wrapper.component.props.props.children.props.children;
    expect(MessageAreaContainer.prototype.componentDidMount.calledOnce).toBe(true);
    expect(currentState.groupReducer).toEqual({ groups: { id: '', Groups: [] } });
    expect(componentProps.props).toBeDefined();
    expect(typeof wrapper.node.store).toEqual('object');
  });

  it('should call onActiveGroupClicked', () => {
    const wrapper = mount(<Provider store={store}><Router history={history}><MessageAreaContainer {...props} /></Router></Provider>);
    expect(wrapper.find('Archive').exists()).toBe(true);
  });
});
