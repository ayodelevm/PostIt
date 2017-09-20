import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Notifications from 'react-notify-toast';
import { mount, shallow } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// import store from '../dev/js/store/store';
import Dashboard from '../../dev/js/components/Dashboard.jsx';
import Nav from '../../dev/js/components/common/Nav.jsx';
import GroupForm from '../../dev/js/containers/GroupForm.jsx';
import UploadFileContainer from '../../dev/js/containers/UploadFileContainer.jsx';
import ArchiveAllContainer from '../../dev/js/containers/ArchiveAllContainer.jsx';
import ViewArchivedModal from '../../dev/js/components/ViewArchivedModal.jsx';

// const onActiveGroupClicked = sinon.spy();
const mountWithRouter = node => mount(<Router>{node}</Router>);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  authReducer: {},
  userReducer: { users: [] },
  groupReducer: { groups: { Groups: [] } },
  messageReducer: {},
  archiveReducer: {},
  resetPasswordReducer: {},
  router: {}
});

const props = {
  archivedMessages: {},
  groups: {},
  Groups: [],
  users: [],
  currentUser: {},
  onClick: { handleActiveGroupClicked: () => { Promise.resolve(); } },
  handleActiveGroupClicked: jest.fn()

};

describe('Dashboard Component', () => {
  it('renders one <Nav /> component', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find(Nav)).toHaveLength(1);
  });

  it('renders one <Notifications /> component', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it('renders one <GroupForm /> component', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find(GroupForm)).toHaveLength(1);
  });

  it('renders one <UploadFileContainer /> component', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find(UploadFileContainer)).toHaveLength(1);
  });

  it('renders one <ArchiveAllContainer /> component', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find(ArchiveAllContainer)).toHaveLength(1);
  });

  it('renders one <ViewArchivedModal /> component', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find(ViewArchivedModal)).toHaveLength(1);
  });

  it('renders the accurate number of divs in Dashboard component', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find('div')).toHaveLength(17);
  });

  it('renders h5 text', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find('h5').text()).toEqual('Personal Groups');
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <Dashboard {...props} />
    ));
    expect(wrapper.contains(<div className="divider" />)).toEqual(true);
    expect(wrapper.contains(<span className="black-text" />)).toEqual(false);
    expect(wrapper.contains(<div className="main"><Notifications /></div>)).toEqual(true);
  });

  it('simulates click events', () => {
    const wrapper = mountWithRouter((
      <Provider store={store} ><Dashboard {...props} /></Provider>
    ));
  });
});
