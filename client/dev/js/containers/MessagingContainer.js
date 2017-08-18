import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getOneGroupWithMessages } from '../actions/messageActions';
import { getGroupUsers, getAllGroups } from '../actions/groupActions';
import { getAllUsers } from '../actions/addUserActions';
import MessagingComponent from '../components/MessagingComponent';

class MessagingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grpMessages: {},
      grpUsers: {},
      groupId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { grpMessages, newMessage } = nextProps.groupMessages;
    _.merge(grpMessages, { Messages: [newMessage] });
  }

  componentDidMount() {
    const token = window.localStorage.token;
    const { match } = this.props;
    this.props.getOneGroupWithMessages(token, match.params.id).then(() => {
      this.props.getGroupUsers(token, match.params.id).then(() => {
        this.props.getAllGroups(token).then(() => {
          this.props.getAllUsers(token);
        });
      });
    });
  }

  render() {
    return (
      <MessagingComponent
        messages={this.props.groupMessages.grpMessages}
        grpUsers={this.props.groupData.grpUsers}
        currentUser={this.props.currentUser.currentUser}
        users={this.props.allUsersData.users}
        groups={this.props.groupData.groups}
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
  groupMessages: state.messageReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getGroupUsers, getOneGroupWithMessages, getAllGroups, getAllUsers
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(MessagingContainer);
