import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GroupForm from '../containers/GroupForm';
import UploadFileContainer from '../containers/UploadFileContainer';
import Nav from './common/Nav';

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
                <a className="modal-trigger add-new-group" href="#group-new"><span className="card-title black-text">GROUPS <i className="material-icons add-groups right">add_box</i></span></a>

              </div>
              <div className="divider" />
              <div className="row group-section">

                <h5 className="center">Personal Groups</h5>
                <ul>
                  {filteredGroups && filteredGroups.map(group => (
                    <div key={group.id}>
                      <li className="group-display"><a href="" id={group.id} className="groups grey-text">
                        <span className="left truncate"><i className="material-icons group-icons">lock_open
                          </i> {group.name}</span><i className="material-icons right">settings</i></a>
                      </li><br />
                    </div>
                    ))
                  }
                </ul>
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
                        <Link to={`/groups/${group.id}/message`}>Open</Link>
                      </div>
                    </div>
                  </div>
                </div>))
              }
            </div>
          </div>
          <GroupForm closeModalRoute={'dashboard'} />
          <UploadFileContainer />
        </div>
      </div>

    </div>

  );
};

Dashboard.propTypes = {
  // eslint-disable-next-line
  users: PropTypes.array.isRequired,
  // eslint-disable-next-line
  groups: PropTypes.object
};

export default Dashboard;
