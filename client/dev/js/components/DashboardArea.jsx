import React from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';

import GroupFormContainer from '../containers/GroupFormContainer.jsx';
import UploadsContainer from '../containers/UploadsContainer.jsx';
import Archive from '../containers/Archive.jsx';
import ViewArchivedModal from './ViewArchivedModal.jsx';
import Nav from './common/Nav.jsx';
import PersonalGroups from './dashboardAreaComponents/PersonalGroups.jsx';
import AllGroups from './dashboardAreaComponents/AllGroups.jsx';

/**
 * Gives the presentational view for the users dashboard component
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const DashboardArea = (props) => {
  const { Groups } = props.groups;
  let sortedGroups = [];
  let filteredGroups = [];
  if (Groups) {
    sortedGroups = Groups.sort((a, b) => b.createdAt
    .localeCompare(a.createdAt));
    filteredGroups = Groups.filter(group => group.ownerId === props.groups.id);
  }
  return (
    <div id="message-board-background">
      <Nav />
      <div className="main">
        <Notifications />
      </div>
      <div className="row">
        <div id="message-container">
          <div className="col l3 hide-on-med-and-down">
            <div className="card right-side grey lighten-4 z-depth-3">
              <div className="row valign-wrapper">
                <div id="img-div" className="col s3">
                  <a className="modal-trigger tooltipped"
                    data-position="right" data-tooltip="Upload picture"
                    href="#user-new">
                    <div className="profile-icon"
                      style={{
                        backgroundImage: `url(${props.groups.profileImage})`
                      }} />
                  </a>
                </div>
                <div className="col s9">
                  <span className="black-text truncate">
                    {props.groups.fullname} <br />
                    {props.groups.email}
                  </span>
                </div>
              </div>
              <div className="divider" />
              <div id="content" className="row">
                <br />
                <a className="modal-trigger add-new-group" href="#group-new">
                  <span className="card-title black-text">
                  CREATE GROUP <i className="material-icons add-groups right">
                  add_box</i></span>
                </a>

              </div>
              <div className="divider" />
              <div className="row group-section">

                <h5 className="">Personal Groups</h5>
                <div className="divider" />
                {filteredGroups && filteredGroups.map(group => (
                  <PersonalGroups
                    group={group}
                    onActiveGroupClicked={props.onActiveGroupClicked}
                    key={group.id}
                  />
                    ))
                  }

              </div>
            </div>
          </div>

          <div className="col s12 l9">
            <div className="dashboard-container">
              {sortedGroups && sortedGroups.map(group => (
                <AllGroups
                  group={group}
                  key={group.id}
                />
                ))
              }
            </div>
          </div>
          <GroupFormContainer
            closeModalRoute={'dashboard'}
          />
          <UploadsContainer
            userId={props.currentUser.id}
            closeModalRoute={'dashboard'}
          />
          <Archive
            closeModalRoute={'dashboard'}
          />

          <ViewArchivedModal
            closeModalRoute={'dashboard'}
            users={props.users}
            archivedMessages={props.archivedMessages}
          />
        </div>
      </div>

    </div>

  );
};

DashboardArea.propTypes = {
  users: PropTypes.array.isRequired,
  archivedMessages: PropTypes.object,
  groups: PropTypes.object,
  currentUser: PropTypes.object
};

export default DashboardArea;
