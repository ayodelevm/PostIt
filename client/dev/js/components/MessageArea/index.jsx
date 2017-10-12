import React from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';

import GroupFormContainer from '../../containers/GroupFormContainer.jsx';
import UploadsContainer from '../../containers/UploadsContainer.jsx';
import Nav from '../common/Nav.jsx';
import MessageFormContainer from '../../containers/MessageFormContainer.jsx';
import AddUsers from '../../containers/AddUsers.jsx';
import Archive from '../../containers/Archive.jsx';
import GroupMembersModal from '../GroupMembersModal.jsx';
import ViewArchivedModal from '../ViewArchivedModal.jsx';
import AllGroups from './AllGroups.jsx';
import GroupTitle from './GroupTitle.jsx';
import MessageBoardIcons from './MessageBoardIcons.jsx';
import RenderMessage from './RenderMessage.jsx';


/**
 * Gives the presentational view for the users messaging page component
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const MessageArea = (props) => {
  const { messages, currentUser, users, groups } = props;
  const { Groups } = props.groups;
  const { Messages } = props.messages;
  let sortedMessages = [];
  if (Messages) {
    sortedMessages = Messages.sort((a, b) => a
    .createdAt.localeCompare(b.createdAt));
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
                <a className="modal-trigger tooltipped"
                  data-position="right" data-tooltip="Upload picture"
                  href="#user-new"><div className="profile-icon"
                    style={{
                      backgroundImage: `url(${groups.profileImage})`
                    }} />
                </a>
              </div>
              <div className="col s9">
                <span className="black-text truncate">
                  {groups.fullname} <br />
                  {groups.email}
                </span>
              </div>
            </div>
            <div className="divider" />
            <div id="content" className="row">
              <br />
              <a className="modal-trigger add-new-group" href="#group-new">
                <span className="card-title black-text">GROUPS <i
                  className="material-icons add-groups right">add_box</i>
                </span></a>
              <div className="row group-section-message">
                <ul>
                  {
                    Groups && Groups.sort((a, b) => b.createdAt
                    .localeCompare(a.createdAt))
                    .map(group => (
                      [
                        groups.id === group.ownerId ?
                          <AllGroups
                            group={group}
                            name={'lock_open'}
                            /> :
                          <AllGroups
                            group={group}
                            name={'lock'}
                            />
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
                <div className="col s12 l9">
                  {messages.UserId === currentUser.id ?
                    <GroupTitle
                      messages={messages}
                      name={'lock_open'}
                    /> :
                    <GroupTitle
                      messages={messages}
                      name={'lock'}
                    />
                  }
                </div>
                <div className="col s12 l3 message-board-icons">
                  {messages.UserId === currentUser.id ?
                    <MessageBoardIcons
                      onActiveGroupClicked={props.onActiveGroupClicked}
                      messages={messages}
                      groupAdd={'group_add'}
                      archive={'Archive All Messages'}
                      view={'View Archived Messages'}
                      valid
                    /> :
                    <MessageBoardIcons
                      onActiveGroupClicked={props.onActiveGroupClicked}
                      messages={messages}
                      groupAdd={''}
                      view={'View Archived Messages'}
                      valid={false}
                    />
                  }
                </div>

              </div>
            </div>
            <div className="message-body">
              {sortedMessages && sortedMessages.map(message => (
                <RenderMessage
                  users={users}
                  message={message}
                  key={message.id}
                  />
                ))}
            </div>
            <div className="text-area">
              <div className="row text-area-row">
                <MessageFormContainer groupId={messages.id} />
              </div>
            </div>
          </div>
        </div>
        <GroupFormContainer
          closeModalRoute={`groups/${messages.id}/message`}
        />
        <UploadsContainer
          userId={props.currentUser.id}
          groupId={messages.id}
          closeModalRoute={`groups/${messages.id}/message`}
        />
        <AddUsers
          closeModalRoute={`groups/${messages.id}/message`}
          groupId={messages.id}
          groupMembers={props.groupUsers.Users}
        />
        <GroupMembersModal
          closeModalRoute={`groups/${messages.id}/message`}
          groupMembers={props.groupUsers.Users}
        />

        <Archive
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

MessageArea.propTypes = {
  archivedMessages: PropTypes.object,
  users: PropTypes.array,
  groups: PropTypes.object,
  onActiveGroupClicked: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  groupUsers: PropTypes.object,
  messages: PropTypes.object,
};

export default MessageArea;
