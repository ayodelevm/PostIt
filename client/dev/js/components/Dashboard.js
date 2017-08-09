import React from 'react';
import { Link } from 'react-router-dom';
import GroupModal from './GroupModal';

const Dashboard = () => (
  <div id="message-board-background" className="row">
    <div id="message-container">
      <div className="col l3 hide-on-med-and-down">
        <div className="card-panel grey lighten-4 z-depth-3">
          <div className="row valign-wrapper">
            <div id="img-div" className="col s3">
              <img src="https://pbs.twimg.com/profile_images/660946436801101824/niM7azZS.jpg" alt="" className="circle responsive-img" />
            </div>
            <div className="col s9">
              <span className="black-text">
                Sola paulina <br />
                solap@gmail.com
              </span>
            </div>
          </div>
          <div className="divider" />
          <div id="content" className="row">
            <br />
            <a className="modal-trigger" href="#modal1"><span className="card-title black-text">GROUPS <i className="material-icons add-groups right">add_box</i></span></a>
            <div className="row group-section">
              <ul>
                <li className="group-display"><a href="" className="groups grey-text"><span className="left truncate">Learn Python</span><span className="right">6</span></a></li><br />
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

export default Dashboard;
