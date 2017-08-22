import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Notifications from 'react-notify-toast';
import GroupForm from '../containers/GroupForm.jsx';
import UploadFileContainer from '../containers/UploadFileContainer.jsx';
import Nav from './common/Nav.jsx';
import MessagingForm from '../containers/MessagingForm.jsx';
import AddUsersContainer from '../containers/AddUsersContainer.jsx';
import GroupMembersModal from './GroupMembersModal.jsx';

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

const MessagingComponent = (props) => {
  const { messages, currentUser, users, groups } = props;
  const { Groups } = props.groups;
  const { Messages } = props.messages;
  let sortedMessages = [];
  if (Messages) {
    sortedMessages = Messages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }


  return (<div id="message-board-background">
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
                <a className="modal-trigger" href="#user-new"><div className="profile-icon" style={{ backgroundImage: `url(${currentUser.profileImage})` }} /></a>
              </div>
              <div className="col s9">
                <span className="black-text">
                  {currentUser.fullname} <br />
                  {currentUser.email}
                </span>
              </div>
            </div>
            <div className="divider" />
            <div id="content" className="row">
              <br />
              <a className="modal-trigger add-new-group" href="#group-new"><span className="card-title black-text">GROUPS <i className="material-icons add-groups right">add_box</i></span></a>
              <div className="row group-section">
                <ul>
                  {
                    Groups && Groups.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                    .map(group => (
                      [
                        groups.id === group.ownerId ?
                          <div key={group.id}>
                            <li className="group-display"><a href={`/groups/${group.id}/message`} className="groups grey-text">
                              <span className="left truncate"><i className="material-icons group-icons">lock_open
                            </i> {group.name}</span><span className="right" /></a></li><br />
                          </div> :
                          <div key={group.id}>
                            <li className="group-display"><a href={`/groups/${group.id}/message`} className="groups grey-text">
                              <span className="left truncate"><i className="material-icons group-icons">lock
                            </i> {group.name}</span><span className="right" /></a></li><br />
                          </div>
                      ]
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col s12 l9">
          <div className="message-text z-depth-3">
            <div className="message-header z-depth-2">
              <div className="row">
                <div className="col s10">
                  {messages.UserId === currentUser.id ?
                    <h5 className="group-title"><i className="material-icons group-icons">lock_open</i> {messages.name}</h5> :
                    <h5 className="group-title"><i className="material-icons group-icons">lock</i> {messages.name}</h5>
                  }
                </div>
                <div className="col s2">
                  {messages.UserId === currentUser.id ?
                    <ul className="group-icons">
                      <li><a className="modal-trigger" href="#add-new"><i className="material-icons left">group_add</i></a></li>
                      <li><a className="modal-trigger" href="#group-members"><i className="material-icons left">group</i></a></li>
                      <li><a href=""><i className="material-icons">settings</i></a></li>
                    </ul> :
                    <ul className="group-icons">
                      <li><a><i className="material-icons left" /></a></li>
                      <li><a href=""><i className="material-icons left">group</i></a></li>
                      <li><a><i className="material-icons" /></a></li>
                    </ul>
                  }
                </div>

              </div>
              <div className="row adjust">
                <span className="group-description">{messages.description}</span>
              </div>
            </div>
            <div className="message-body">
              {sortedMessages && sortedMessages.map(message => renderMessage(users, message))}
            </div>
            <div className="text-area">
              <div className="row">
                <MessagingForm groupId={messages.id} />
              </div>
            </div>
          </div>
        </div>
        <GroupForm closeModalRoute={`groups/${messages.id}/message`} />
        <UploadFileContainer />
        <AddUsersContainer
          closeModalRoute={`groups/${messages.id}/message`}
          groupId={messages.id}
          groupMembers={props.grpUsers}
        />
        <GroupMembersModal
          closeModalRoute={`groups/${messages.id}/message`}
          groupMembers={props.grpUsers.Users}
        />

      </div>
    </div>


  </div>);
};

MessagingComponent.propTypes = {
  // eslint-disable-next-line
  users: PropTypes.array,
  // eslint-disable-next-line
  groups: PropTypes.object,
  currentUser: PropTypes.object,
  grpUsers: PropTypes.object,
  messages: PropTypes.object,
};

export default MessagingComponent;
