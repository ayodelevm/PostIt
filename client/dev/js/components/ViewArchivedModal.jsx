import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Gives the presentational view for how archived messages
 * are displayed in the messaging component
 * @param {array} users
 * @param {object} message
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const renderMessage = (users, message) => {
  if (users && message) {
    const foundUser = users.find(user => user.id === message.ownerId);
    if (foundUser) {
      return (
        <div key={message.id} className="row">
          <div className="z-depth-1">
            <div className="col s2 image-div">
              <div className="profile-img" style={{ backgroundImage: `url(${foundUser.profileImage})` }} />
            </div>
            <div className="col s10">
              <span className="message-username">@{foundUser.username} | </span>
              <span className="date-time">
                {(new Date(message.createdAt)).toLocaleString()}
              </span>
              <span
                className={classnames({
                  'status-normal': message.priority === 'Normal',
                  'status-urgent': message.priority === 'Urgent',
                  'status-critical': message.priority === 'Critical'
                })}
              > { message.priority} </span><br />
              <span className="message-actual">{message.message}</span>
            </div>
          </div>
        </div>);
    }
  }
};

/**
 * Gives the presentational view for displaying archived messages
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const ViewArchivedModal = (props) => {
  const { Messages } = props.archivedMessages;
  return (

    <div id="view-archive" className="modal">
      <div className="row modal-close-div">
        <Link to={`/${props.closeModalRoute}`} className="modal-action modal-close waves-effect waves-green btn-flat right"><i className="material-icons center">close</i></Link>
      </div>

      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card white">
            <div className="card-content black-text">
              <div className="row card-title-area">
                <span className="card-title create">Archived Messages for {props.archivedMessages.name}</span>
              </div>
              <div className="row card-form-section">

                <form className="col s12" noValidate>

                  <div className="divider" />
                  <br />
                  {Messages && Messages.length !== 0 ?
                    Messages.map(message => renderMessage(props.users, message)) :
                    <h6>There are currently no archived messages in this group</h6>
                  }
                </form>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

ViewArchivedModal.propTypes = {
  archivedMessages: PropTypes.object,
  users: PropTypes.array,
  closeModalRoute: PropTypes.string.isRequired
};

export default ViewArchivedModal;
