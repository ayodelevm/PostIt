import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import PropTypes from 'prop-types';
import GroupModal from './GroupModal';

const Dashboard = (props) => {
  const { Groups } = props.groups;
  console.log(props.users, '=====users**====');
  console.log(props.groups.Groups, '=====groups**====');
  return (
    <div id="message-board-background" className="row">
      <div className="main">
        <Notifications />
      </div>
      <div id="message-container">
        <div className="col l3 hide-on-med-and-down">
          <div className="card-panel grey lighten-4 z-depth-3">
            <div className="row valign-wrapper">
              <div id="img-div" className="col s3">
                <img src={props.groups.profileImage} alt="" className="circle responsive-img" />
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
              <Link className="modal-trigger" to="#group-new"><span className="card-title black-text">GROUPS <i className="material-icons add-groups right">add_box</i></span></Link>
              <div className="row group-section">
                <ul>
                  {Groups && Groups.map(group => (
                    <div key={group.id}>
                      <li className="group-display"><a href="" className="groups grey-text"><span className="left truncate">{group.name}</span><span className="right">6</span></a></li><br />
                    </div>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col s12 l9">
          <div className="card-panel grey lighten-4 z-depth-3">
            <div className="row" />
          </div>
        </div>

      </div>

      <GroupModal />
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
