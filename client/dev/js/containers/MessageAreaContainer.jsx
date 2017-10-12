import React from 'react';
import { Redirect } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getGroupMessages,
  setCurrentMessages
} from '../actions/messageActions';
import { getGroupUsers, getUserGroups } from '../actions/groupActions';
import { getAllUsers } from '../actions/userActions';
import {
  selectedGroupDetails,
  getArchivedMessages
} from '../actions/archiveActions';
import MessageArea from '../components/MessageArea';

/**
 * This class is the container component for the users messaging board
 * It is responsible for managing all the state changes in the component
 * @class MessageAreaContainer
 * @extends {Component}
 */
export class MessageAreaContainer extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      redirect: false
    };

    this.handleActiveGroupClicked = this.handleActiveGroupClicked.bind(this);
  }

  /**
   * Fetches users, group, group members and group messages data when the
   * component mounts and initializes the materialize dropdown component
   * @method componentDidMount
   * @memberof MessageAreaContainer
   * @returns {void}
   */
  componentDidMount() {
    const { match } = this.props;
    const token = window.localStorage.token;
    if (match !== undefined) {
      this.props.getGroupMessages(token, match.params.id)
        .then(() => {
          if (this.props.groupMessages.getMessagesSuccess) {
            this.props.getGroupUsers(token, match.params.id)
            .then(() => this.props.getUserGroups(token))
            .then(() => this.props.getAllUsers(token))
            .then(() => {
              $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false,
                hover: false,
                gutter: 0,
                belowOrigin: true,
                alignment: 'left',
                stopPropagation: false
              });
            });
          } else {
            this.setState({ redirect: true });
            notify
              .show(this.props.groupMessages.errors.globals, 'warning', 3000);
          }
        });
    }
  }

  /**
   * Takes in the target object of the onclick event and passes an object
   * containging the clicked group's id and name to the redux store
   * then fetches all archived messages in the clicked group
   * @method handleActiveGroupClicked
   * @memberof MessageAreaContainer
   * @param {object} event
   * @returns {void}
   */
  handleActiveGroupClicked(event) {
    event.preventDefault();
    const token = window.localStorage.token;

    Promise.resolve(
      this.props.selectedGroupDetails({
        id: event.target.id,
        name: event.target.name
      })
    )
    .then(() => {
      this.props
        .getArchivedMessages(token, this.props.archiveData.setGroupDetails.id);
    });
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    return (
      <div>
        {
          this.state.redirect ? <Redirect push to="/dashboard" /> :
          <MessageArea
            archivedMessages={this.props.archiveData.archivedMessages}
            messages={this.props.groupMessages.groupMessages}
            groupUsers={this.props.groupData.groupUsers}
            currentUser={this.props.currentUser.currentUser}
            users={this.props.allUsersData.users}
            groups={this.props.groupData.groups}
            onActiveGroupClicked={this.handleActiveGroupClicked}
          />
        }
      </div>
    );
  }
}

MessageAreaContainer.propTypes = {
  getArchivedMessages: PropTypes.func.isRequired,
  selectedGroupDetails: PropTypes.func.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  getGroupMessages: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  groupMessages: PropTypes.object.isRequired,
  groupData: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  allUsersData: PropTypes.object.isRequired,
  archiveData: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupData: state.groupReducer,
  allUsersData: state.userReducer,
  currentUser: state.authReducer,
  groupMessages: state.messageReducer,
  archiveData: state.archiveReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getGroupUsers,
  getGroupMessages,
  getUserGroups,
  getAllUsers,
  setCurrentMessages,
  selectedGroupDetails,
  getArchivedMessages
}, dispatch);

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(MessageAreaContainer);
