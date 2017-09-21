import React from 'react';
import configureMockStore from 'redux-mock-store';
import createHistory from 'history/createBrowserHistory';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import localStorageMock from '../__mocks__/localStorageMock';
import { MessagingContainer } from '../../dev/js/containers/MessagingContainer.jsx';
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
  match: {params: {id: 4 } },
  groupData: { groups: { id: '', Groups: [] }, grpUsers: { id: '', Users: [] } },
  allUsersData: { users: [] },
  currentUser: { currentUser: { id: 4 } },
  archiveData: { archivedMessages: { Messages: [] } },
  groupMessages: { grpMessages: { Messages: [] } },
  getOneGroupWithMessages: () => { return Promise.resolve(); },
  getGroupUsers: jest.fn(),
  selectedGroupDetails: jest.fn(),
  getArchivedMessages: jest.fn(),
  getAllGroups: () => { return Promise.resolve(); },
  getAllUsers: jest.fn(),
  handleActiveGroupClicked: jest.fn()
};

describe('Messaging Container', () => {
  // beforeEach(() => {
  //   const wrapper = mount(<Provider store={store}><Router history={history}><MessagingContainer {...props} /></Router></Provider>);
  // })

  it('renders the dashboard container', () => {
    const wrapper = mount(<Provider store={store}><Router history={history}><MessagingContainer {...props} /></Router></Provider>);
    expect(wrapper.find('MessagingComponent').exists()).toBe(true);
  });

  it('should call componentDidMount', () => {
    sinon.spy(MessagingContainer.prototype, 'componentDidMount');
    const wrapper = mount(<Provider store={store}><Router history={history}><MessagingContainer {...props} /></Router></Provider>);
    const currentState = wrapper.component.props.props.store.getState();
    const componentProps = wrapper.component.props.props.children.props.children;
    expect(MessagingContainer.prototype.componentDidMount.calledOnce).toBe(true);
    expect(currentState.groupReducer).toEqual({ groups: { id: '', Groups: [] } });
    expect(componentProps.props).toBeDefined();
    expect(typeof wrapper.node.store).toEqual('object');
  });

  it('should call onActiveGroupClicked', () => {
    const wrapper = mount(<Provider store={store}><Router history={history}><MessagingContainer {...props} /></Router></Provider>);
    expect(wrapper.find('ArchiveAllContainer').exists()).toBe(true);
  });
});
