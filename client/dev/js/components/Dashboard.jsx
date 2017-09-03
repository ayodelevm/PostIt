import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import GroupForm from '../containers/GroupForm.jsx';
import UploadFileContainer from '../containers/UploadFileContainer.jsx';
import ArchiveAllContainer from '../containers/ArchiveAllContainer.jsx';
import ViewArchivedModal from './ViewArchivedModal.jsx';
import Nav from './common/Nav.jsx';

/**
 * Gives the presentational view for the users dashboard component
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const Dashboard = (props) => {
  const { Groups } = props.groups;
  let sortedGroups = [];
  let filteredGroups = [];
  if (Groups) {
    sortedGroups = Groups.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
                  <a className="modal-trigger" href="#user-new"><div className="profile-icon" style={{ backgroundImage: `url(${props.groups.profileImage})` }} /></a>
                </div>
                <div className="col s9">
                  <span className="black-text">
                    {props.groups.fullname} <br />
                    {props.groups.email}
                  </span>
                </div>
              </div>
              <div className="divider" />
              <div id="content" className="row">
                <br />
                <a className="modal-trigger add-new-group" href="#group-new"><span className="card-title black-text">CREATE GROUP <i className="material-icons add-groups right">add_box</i></span></a>

              </div>
              <div className="divider" />
              <div className="row group-section">

                <h5 className="">Personal Groups</h5>
                <div className="divider" />
                {filteredGroups && filteredGroups.map(group => (
                  <ul key={group.id} className="collapsible z-depth-0" data-collapsible="accordion">
                    <li>
                      <div className="group-display collapsible-header grey lighten-4"><span className="truncate"><i className="material-icons group-icons">lock_open</i> {group.name}</span><i className="material-icons right group-settings">arrow_drop_down</i></div>

                      <div className="collapsible-body ">
                        <ul>
                          <li><Link name={group.name} className="modal-trigger waves-effect waves-blue black-text" onClick={props.handleActiveGroupClicked} id={group.id} to="#archive-all">Archive All Messages</Link></li>
                          {/* <li><Link className="modal-trigger waves-effect waves-blue black-text" onClick={props.handleActiveGroupClicked} to="">Archive Selected Messages</Link></li> */}
                          <li><Link name={group.name} className="modal-trigger waves-effect waves-blue black-text" onClick={props.handleActiveGroupClicked} id={group.id} to="#view-archive">View Archived Messages</Link></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                    ))
                  }

              </div>
            </div>
          </div>

          <div className="col s12 l9">
            <div className="dashboard-container">
              {sortedGroups && sortedGroups.map(group => (
                <div key={group.id} className="col s12 m6">
                  <div className="card horizontal">
                    <div className="card-image">
                      <img src="https://lorempixel.com/100/190/nature/6" alt="dashboard" />
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <h5>{group.name}</h5>
                        <p className="flow-text description">
                          {group.description}
                        </p>
                      </div>
                      <div className="card-action">
                        <a href={`/groups/${group.id}/message`}>Open</a>
                      </div>
                    </div>
                  </div>
                </div>))
              }
            </div>
          </div>
          <GroupForm
            closeModalRoute={'dashboard'}
          />
          <UploadFileContainer
            userId={props.currentUser.id}
            closeModalRoute={'dashboard'}
          />
          <ArchiveAllContainer
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

Dashboard.propTypes = {
  handleActiveGroupClicked: PropTypes.func.isRequired,
  // eslint-disable-next-line
  users: PropTypes.array.isRequired,
  // eslint-disable-next-line
  groups: PropTypes.object,
  currentUser: PropTypes.object
};

export default Dashboard;
