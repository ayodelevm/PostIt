import React from 'react';
import { Link } from 'react-router-dom';
import GroupForm from '../containers/GroupForm';

const GroupModal = () => (
  <div id="group-new" className="modal">
    <div className="row modal-close-div">
      <Link to="/dashboard" className="modal-action modal-close waves-effect waves-green btn-flat right"><i className="material-icons center">close</i></Link>
    </div>

    <div className="row">
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card white">
          <div className="card-content black-text">
            <div className="row card-title-area">
              <span className="card-title create">Create a group</span>
              <p className="flow-text par grey-text">Groups are where you communicate with your friends, family and teams. They are best utilized when organized around a particular purpose</p>
            </div>
            <div className="row card-form-section">

              <GroupForm />
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
);

export default GroupModal;
