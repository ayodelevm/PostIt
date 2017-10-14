import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Gives the presentational view for how messages
 * are displayed in the messaging component
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const RenderMessage = (props) => {
  const { users, message } = props;
  if (users && message) {
    const foundUser = users.find(user => user.id === message.ownerId);
    if (foundUser) {
      return (
        <div key={message.id} className="row">
          <div className="z-depth-1">
            <div className="col s2 image-div">
              <div className="profile-img"
                style={{
                  backgroundImage: `url(${foundUser.profileImage})`
                }} />
            </div>
            <div className="col s10">
              <span
                className="message-username">@{foundUser.username} |&nbsp;&nbsp;</span>
              <span className="date-time">
                {(new Date(message.createdAt)).toLocaleString()}
              </span>
              <span>&nbsp;&nbsp;</span>
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
  return null;
};

RenderMessage.propTypes = {
  users: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired,
};

export default RenderMessage;
