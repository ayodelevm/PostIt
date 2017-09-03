import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOneGroupWithMessages, setCurrentMessages } from '../actions/messageActions';
import { getGroupUsers, getAllGroups } from '../actions/groupActions';
import { getAllUsers } from '../actions/addUserActions';
import { selectedGroupDetails, getArchivedMessages } from '../actions/archiveActions';
import MessagingComponent from '../components/MessagingComponent.jsx';

class MessagingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grpMessages: {},
      grpUsers: {},
      users: [],
      groups: {},
      currentUser: {}
    };

    this.onActiveGroupClicked = this.onActiveGroupClicked.bind(this);
  }

  onActiveGroupClicked(e) {
    e.preventDefault();
    const token = window.localStorage.token;

    Promise.resolve(
      this.props.selectedGroupDetails({ id: e.target.id, name: e.target.name })
    )
    .then(() => {
      this.props.getArchivedMessages(token, this.props.archiveData.setGroupDetails.id);
    });
  }

  componentDidMount() {
    const { match } = this.props;
    const token = window.localStorage.token;
    if (match !== undefined) {
      this.props.getOneGroupWithMessages(token, match.params.id)
        .then(() => this.props.getGroupUsers(token, match.params.id))
        .then(() => this.props.getAllGroups(token))
        .then(() => this.props.getAllUsers(token))
        .then(() => {
          $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false,
            hover: true,
            gutter: 0,
            belowOrigin: true,
            alignment: 'left',
            stopPropagation: false
          });
        });
    }
  }

  render() {
    return (
      <MessagingComponent
        archivedMessages={this.props.archiveData.archivedMessages}
        messages={this.props.groupMessages.grpMessages}
        grpUsers={this.props.groupData.grpUsers}
        currentUser={this.props.currentUser.currentUser}
        users={this.props.allUsersData.users}
        groups={this.props.groupData.groups}
        handleActiveGroupClicked={this.onActiveGroupClicked}
      />
    );
  }
}

MessagingContainer.propTypes = {
  getGroupUsers: PropTypes.func.isRequired,
  getOneGroupWithMessages: PropTypes.func.isRequired,
  getAllGroups: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
  groupMessages: PropTypes.object,
  // eslint-disable-next-line
  groupData: PropTypes.object,
  // eslint-disable-next-line
  currentUser: PropTypes.object,
  // eslint-disable-next-line  
  allUsersData: PropTypes.object
};

const mapStateToProps = state => ({
  groupData: state.groupReducer,
  allUsersData: state.addUserReducer,
  currentUser: state.authReducer,
  groupMessages: state.messageReducer,
  archiveData: state.archiveReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getGroupUsers,
  getOneGroupWithMessages,
  getAllGroups,
  getAllUsers,
  setCurrentMessages,
  selectedGroupDetails,
  getArchivedMessages
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(MessagingContainer);
