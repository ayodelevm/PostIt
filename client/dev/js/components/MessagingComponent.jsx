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
import ArchiveAllContainer from '../containers/ArchiveAllContainer.jsx';
import GroupMembersModal from './GroupMembersModal.jsx';
import ViewArchivedModal from './ViewArchivedModal.jsx';

/**
 * Gives the presentational view for how messages are displayed in the messaging component
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
 * Gives the presentational view for the users messaging page component
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
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
                <a className="modal-trigger" href="#user-new"><div className="profile-icon" style={{ backgroundImage: `url(${groups.profileImage})` }} /></a>
              </div>
              <div className="col s9">
                <span className="black-text">
                  {groups.fullname} <br />
                  {groups.email}
                </span>
              </div>
            </div>
            <div className="divider" />
            <div id="content" className="row">
              <br />
              <a className="modal-trigger add-new-group" href="#group-new"><span className="card-title black-text">GROUPS <i className="material-icons add-groups right">add_box</i></span></a>
              <div className="row group-section-message">
                <ul>
                  {
                    Groups && Groups.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                    .map(group => (
                      [
                        groups.id === group.ownerId ?
                          <div key={group.id}>
                            <li className="group-display"><a href={`/groups/${group.id}/message`} className="groups black-text">
                              <span className="left truncate"><i className="material-icons group-icons">lock_open
                            </i> {group.name}</span><span className="right" /></a></li><br />
                          </div> :
                          <div key={group.id}>
                            <li className="group-display"><a href={`/groups/${group.id}/message`} className="groups black-text">
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
                    <div>
                      <h5 className="group-title"><i className="material-icons group-icons">lock_open</i> {messages.name}</h5>
                      <div className="row adjust">
                        <span className="group-description">{messages.description}</span>
                      </div>
                    </div> :
                    <div>
                      <h5 className="group-title"><i className="material-icons group-icons">lock</i> {messages.name}</h5>
                      <div className="row adjust">
                        <span className="group-description">{messages.description}</span>
                      </div>
                    </div>
                  }
                </div>
                <div className="col s2">
                  {messages.UserId === currentUser.id ?
                    <div>
                      <ul className="group-icons">
                        <li><Link className="modal-trigger" to="#add-new"><i className="material-icons left">group_add</i></Link></li>
                        <li><Link className="modal-trigger" to="#group-members"><i className="material-icons left">group</i></Link></li>
                        <li><a href="" className="dropdown-button" data-activates="archive-dropdown"><i className="material-icons">settings</i></a></li>
                      </ul>
                      <ul id="archive-dropdown" className="dropdown-content">
                        <li><Link name={messages.name} className="modal-trigger waves-effect waves-blue black-text" onClick={props.handleActiveGroupClicked} id={messages.id} to="#archive-all">Archive All Messages</Link></li>
                        {/* <li><a className="waves-effect waves-blue black-text" to="">Archive Selected Messages</a></li> */}
                        <li><Link name={messages.name} className="modal-trigger waves-effect waves-blue black-text" onClick={props.handleActiveGroupClicked} id={messages.id} to="#view-archive">View Archived Messages</Link></li>
                      </ul>
                    </div>
                    :
                    <div>
                      <ul className="group-icons">
                        <li><a><i className="material-icons left" /></a></li>
                        <li><Link className="modal-trigger" to="#group-members"><i className="material-icons left">group</i></Link></li>
                        <li><a href="" className="dropdown-button" data-activates="archive-dropdown"><i className="material-icons">settings</i></a></li>
                      </ul>
                      <ul id="archive-dropdown" className="dropdown-content">
                        <li><Link name={messages.name} className="modal-trigger waves-effect waves-blue black-text" onClick={props.handleActiveGroupClicked} id={messages.id} to="#view-archive">View Archived Messages</Link></li>
                      </ul>
                    </div>
                  }
                </div>

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
        <UploadFileContainer
          userId={props.currentUser.id}
          groupId={messages.id}
          closeModalRoute={`groups/${messages.id}/message`}
        />
        <AddUsersContainer
          closeModalRoute={`groups/${messages.id}/message`}
          groupId={messages.id}
          groupMembers={props.grpUsers.Users}
        />
        <GroupMembersModal
          closeModalRoute={`groups/${messages.id}/message`}
          groupMembers={props.grpUsers.Users}
        />

        <ArchiveAllContainer
          closeModalRoute={`groups/${messages.id}/message`}
          groupId={messages.id}
        />
        <ViewArchivedModal
          closeModalRoute={`groups/${messages.id}/message`}
          users={props.users}
          archivedMessages={props.archivedMessages}
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
  handleActiveGroupClicked: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  grpUsers: PropTypes.object,
  messages: PropTypes.object,
};

export default MessagingComponent;
