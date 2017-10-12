import React from 'react';
import Notifications from 'react-notify-toast';
import { shallow } from 'enzyme';

import DashboardArea from '../../dev/js/components/DashboardArea';
import Nav from '../../dev/js/components/common/Nav.jsx';
import GroupFormContainer from '../../dev/js/containers/GroupFormContainer.jsx';
import UploadsContainer from '../../dev/js/containers/UploadsContainer.jsx';
import Archive from '../../dev/js/containers/Archive.jsx';
import ViewArchivedModal from '../../dev/js/components/ViewArchivedModal.jsx';

const props = {
  archivedMessages: {},
  groups: {},
  Groups: [],
  users: [],
  currentUser: {},
  onClick: { handleActiveGroupClicked: () => { Promise.resolve(); } },
  handleActiveGroupClicked: jest.fn()

};

describe('DashboardArea Component', () => {
  it('renders one <Nav /> component', () => {
    const wrapper = shallow(<DashboardArea {...props} />);
    expect(wrapper.find(Nav)).toHaveLength(1);
  });

  it('renders one <Notifications /> component', () => {
    const wrapper = shallow(<DashboardArea {...props} />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it('renders one <GroupFormContainer /> component', () => {
    const wrapper = shallow(<DashboardArea {...props} />);
    expect(wrapper.find(GroupFormContainer)).toHaveLength(1);
  });

  it('renders one <UploadsContainer /> component', () => {
    const wrapper = shallow(<DashboardArea {...props} />);
    expect(wrapper.find(UploadsContainer)).toHaveLength(1);
  });

  it('renders one <Archive /> component', () => {
    const wrapper = shallow(<DashboardArea {...props} />);
    expect(wrapper.find(Archive)).toHaveLength(1);
  });

  it('renders one <ViewArchivedModal /> component', () => {
    const wrapper = shallow(<DashboardArea {...props} />);
    expect(wrapper.find(ViewArchivedModal)).toHaveLength(1);
  });

  it('renders the accurate number of divs in DashboardArea component', () => {
    const wrapper = shallow(<DashboardArea {...props} />);
    expect(wrapper.find('div')).toHaveLength(17);
  });

  it('renders h5 text', () => {
    const wrapper = shallow(<DashboardArea {...props} />);
    expect(wrapper.find('h5').text()).toEqual('Personal Groups');
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <DashboardArea {...props} />
    ));
    expect(wrapper.contains(<div className="divider" />)).toEqual(true);
    expect(wrapper.contains(<span className="black-text" />)).toEqual(false);
    expect(wrapper.contains(<div className="main"><Notifications /></div>))
    .toEqual(true);
  });
});
