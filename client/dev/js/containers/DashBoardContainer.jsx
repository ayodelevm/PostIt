import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllGroups } from '../actions/groupActions';
import { getAllUsers } from '../actions/addUserActions';
import { selectedGroupDetails, getArchivedMessages } from '../actions/archiveActions';
import Dashboard from '../components/Dashboard.jsx';

class DashBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: {},
      users: []
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
    const token = window.localStorage.token;
    this.props.getAllGroups(token)
    .then(() => this.props.getAllUsers(token))
    .then(() => {
      $('.collapsible').collapsible({
        accordion: true,
      });
    });
  }

  render() {
    return (
      <Dashboard
        archivedMessages={this.props.archiveData.archivedMessages}
        groups={this.props.getAllGroupsResponse.groups}
        users={this.props.getAllUsersResponse.users}
        currentUser={this.props.currentUser.currentUser}
        handleActiveGroupClicked={this.onActiveGroupClicked}
      />
    );
  }
}

DashBoardContainer.propTypes = {
  getAllGroups: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
  getAllGroupsResponse: PropTypes.object,
  // eslint-disable-next-line
  getAllUsersResponse: PropTypes.object,
  // eslint-disable-next-line
  currentUser: PropTypes.object
};

const mapStateToProps = state => ({
  getAllGroupsResponse: state.groupReducer,
  getAllUsersResponse: state.addUserReducer,
  currentUser: state.authReducer,
  archiveData: state.archiveReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ getAllGroups, getAllUsers, selectedGroupDetails, getArchivedMessages }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(DashBoardContainer);
