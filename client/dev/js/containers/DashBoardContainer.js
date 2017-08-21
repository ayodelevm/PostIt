import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getAllGroups } from '../actions/groupActions';
import { getAllUsers } from '../actions/addUserActions';
import Dashboard from '../components/Dashboard';

class DashBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: {},
      users: []
    };
  }


  componentDidMount() {
    const token = window.localStorage.token;
    this.props.getAllGroups(token)
    .then(() => this.props.getAllUsers(token));
  }

  render() {
    return (
      <Dashboard
        groups={this.props.getAllGroupsResponse.groups}
        users={this.props.getAllUsersResponse.users}
        currentUser={this.props.currentUser.currentUser}
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
  // newGroup: PropTypes.object
};

const mapStateToProps = state => ({
  getAllGroupsResponse: state.groupReducer,
  getAllUsersResponse: state.addUserReducer,
  currentUser: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ getAllGroups, getAllUsers }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(DashBoardContainer);
