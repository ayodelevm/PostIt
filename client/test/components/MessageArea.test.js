import React from 'react';
import Notifications from 'react-notify-toast';
import { shallow } from 'enzyme';

import MessageArea from '../../dev/js/components/MessageArea.jsx';
import GroupFormContainer from '../../dev/js/containers/GroupFormContainer.jsx';
import UploadsContainer from '../../dev/js/containers/UploadsContainer.jsx';
import Nav from '../../dev/js/components/common/Nav.jsx';
import MessageFormContainer from '../../dev/js/containers/MessageFormContainer.jsx';
import AddUsers from '../../dev/js/containers/AddUsers.jsx';
import Archive from '../../dev/js/containers/Archive.jsx';
import GroupMembersModal from '../../dev/js/components/GroupMembersModal.jsx';
import ViewArchivedModal from '../../dev/js/components/ViewArchivedModal.jsx';

const props = {
  archivedMessages: {},
  groupUsers: { Users: [] },
  User: {},
  Users: [],
  groups: {},
  Groups: [],
  users: [],
  messages: {},
  Messages: [],
  currentUser: {},
  onClick: { handleActiveGroupClicked: () => { Promise.resolve(); } },
  onActiveGroupClicked: jest.fn()

};

describe('Messaging Area', () => {
  it('renders one <Nav /> component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find(Nav)).toHaveLength(1);
  });

  it('renders one <Notifications /> component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it('renders one <GroupFormContainer /> component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find(GroupFormContainer)).toHaveLength(1);
  });

  it('renders one <MessageFormContainer /> component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find(MessageFormContainer)).toHaveLength(1);
  });

  it('renders one <UploadsContainer /> component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find(UploadsContainer)).toHaveLength(1);
  });

  it('renders one <Archive /> component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find(Archive)).toHaveLength(1);
  });

  it('renders one <ViewArchivedModal /> component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find(ViewArchivedModal)).toHaveLength(1);
  });

  it('renders one <GroupMembersModal /> component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find(GroupMembersModal)).toHaveLength(1);
  });

  it('renders one <AddUsers /> component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find(AddUsers)).toHaveLength(1);
  });

  it('renders the accurate number of divs in MessageArea component', () => {
    const wrapper = shallow(<MessageArea {...props} />);
    expect(wrapper.find('div')).toHaveLength(22);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <MessageArea {...props} />
    ));
    expect(wrapper.contains(<div className="divider" />)).toEqual(true);
    expect(wrapper.contains(<span className="black-text" />)).toEqual(false);
    expect(wrapper.contains(<div className="main"><Notifications /></div>))
    .toEqual(true);
  });
});
