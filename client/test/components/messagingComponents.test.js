import React from 'react';
import Notifications from 'react-notify-toast';
import { shallow } from 'enzyme';

import MessagingComponent from '../../dev/js/components/MessagingComponent.jsx';
import GroupForm from '../../dev/js/containers/GroupForm.jsx';
import UploadFileContainer from '../../dev/js/containers/UploadFileContainer.jsx';
import Nav from '../../dev/js/components/common/Nav.jsx';
import MessagingForm from '../../dev/js/containers/MessagingForm.jsx';
import AddUsersContainer from '../../dev/js/containers/AddUsersContainer.jsx';
import ArchiveAllContainer from '../../dev/js/containers/ArchiveAllContainer.jsx';
import GroupMembersModal from '../../dev/js/components/GroupMembersModal.jsx';
import ViewArchivedModal from '../../dev/js/components/ViewArchivedModal.jsx';

const props = {
  archivedMessages: {},
  grpUsers: { Users: [] },
  User: {},
  Users: [],
  groups: {},
  Groups: [],
  users: [],
  messages: {},
  Messages: [],
  currentUser: {},
  onClick: { handleActiveGroupClicked: () => { Promise.resolve(); } },
  handleActiveGroupClicked: jest.fn()

};

describe('Messaging Component', () => {
  it('renders one <Nav /> component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find(Nav)).toHaveLength(1);
  });

  it('renders one <Notifications /> component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it('renders one <GroupForm /> component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find(GroupForm)).toHaveLength(1);
  });

  it('renders one <MessagingForm /> component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find(MessagingForm)).toHaveLength(1);
  });

  it('renders one <UploadFileContainer /> component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find(UploadFileContainer)).toHaveLength(1);
  });

  it('renders one <ArchiveAllContainer /> component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find(ArchiveAllContainer)).toHaveLength(1);
  });

  it('renders one <ViewArchivedModal /> component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find(ViewArchivedModal)).toHaveLength(1);
  });

  it('renders one <GroupMembersModal /> component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find(GroupMembersModal)).toHaveLength(1);
  });

  it('renders one <AddUsersContainer /> component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find(AddUsersContainer)).toHaveLength(1);
  });

  it('renders the accurate number of divs in MessagingComponent component', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find('div')).toHaveLength(25);
  });

  it('renders h5 text', () => {
    const wrapper = shallow(<MessagingComponent {...props} />);
    expect(wrapper.find('h5').text()).toEqual('lock_open ');
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <MessagingComponent {...props} />
    ));
    expect(wrapper.contains(<div className="divider" />)).toEqual(true);
    expect(wrapper.contains(<span className="black-text" />)).toEqual(false);
    expect(wrapper.contains(<div className="main"><Notifications /></div>)).toEqual(true);
  });
});
