import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Modal giving the presentational view for members of a group
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const GroupMembersModal = props => (

  <div id="group-members" className="modal">
    <div className="row modal-close-div">
      <Link
        to={`/${props.closeModalRoute}`}
        className={
            'modal-action modal-close waves-effect waves-green btn-flat right'
          }
        >
        <i className="material-icons center">
            close
          </i>
      </Link>
    </div>

    <div className="row members-modal">
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card white members-form">
          <div className="card-content black-text">
            <div className="row card-title-area">
              <span className="card-title create">
                  View Group Members
                </span>
            </div>
            <div className="row card-form-section">

              <form className="col s12" noValidate>

                <div className="divider" />
                <br />
                {props.groupMembers && props.groupMembers.map(user => (
                  <div key={user.id} className="row valign-wrapper">
                    <div id="img-div" className="col s3">
                      <div
                        className="profile-icon"
                        style={{
                          backgroundImage: `url(${user.profileImage})`
                        }} />
                    </div>
                    <div className="col s9">
                      <span className="black-text">
                        {user.fullname} <br />
                        {user.email} <br />
                        {user.telephone}
                      </span>
                    </div>
                  </div>))

                  }
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
  );

GroupMembersModal.defaultProps = {
  state: {
    members: [],
    errors: {},
  }
};

GroupMembersModal.propTypes = {
  closeModalRoute: PropTypes.string.isRequired,
  groupMembers: PropTypes.array,
};

export default GroupMembersModal;
