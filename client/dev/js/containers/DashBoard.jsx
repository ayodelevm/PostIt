import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserGroups } from '../actions/groupActions';
import { getAllUsers } from '../actions/userActions';
import { selectedGroupDetails, getArchivedMessages } from '../actions/archiveActions';
import DashboardArea from '../components/DashboardArea.jsx';

/**
 * This class is the container component for the users dashboard
 * It is responsible for managing all the state changes in the component
 * @class Dashboard
 * @extends {Component}
 */
export class DashBoard extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      groups: {},
      users: []
    };
    this.handleActiveGroupClicked = this.handleActiveGroupClicked.bind(this);
  }

  /**
   * Fetches users and group data when the component mounts
   * and initializes the materialize collapsible accordion component
   * @method componentDidMount
   * @memberof Dashboard
   * @returns {void}
   */
  componentDidMount() {
    const token = window.localStorage.token;
    this.props.getUserGroups(token)
    .then(() => this.props.getAllUsers(token))
    .then(() => {
      $('.collapsible').collapsible({
        accordion: true,
      });
    });
  }

  /**
   * Takes in the target object of the onclick event and passes an object
   * containging the clicked group's id and name to the redux store
   * then fetches all archived messages in the clicked group
   * @method handleActiveGroupClicked
   * @memberof Dashboard
   * @param {object} event
   * @returns {void}
   */
  handleActiveGroupClicked(event) {
    event.preventDefault();
    const token = window.localStorage.token;

    Promise.resolve(
      this.props.selectedGroupDetails({ id: event.target.id, name: event.target.name })
    )
    .then(() => {
      this.props.getArchivedMessages(token, this.props.archiveData.setGroupDetails.id);
    });
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    return (
      <DashboardArea
        archivedMessages={this.props.archiveData.archivedMessages}
        groups={this.props.getUserGroupsResponse.groups}
        users={this.props.getAllUsersResponse.users}
        currentUser={this.props.currentUser.currentUser}
        onActiveGroupClicked={this.handleActiveGroupClicked}
      />
    );
  }
}

DashBoard.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getArchivedMessages: PropTypes.func.isRequired,
  selectedGroupDetails: PropTypes.func.isRequired,
  getUserGroupsResponse: PropTypes.object,
  getAllUsersResponse: PropTypes.object,
  currentUser: PropTypes.object,
  archiveData: PropTypes.object
};

const mapStateToProps = state => ({
  getUserGroupsResponse: state.groupReducer,
  getAllUsersResponse: state.userReducer,
  currentUser: state.authReducer,
  archiveData: state.archiveReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ getUserGroups,
  getAllUsers,
  selectedGroupDetails,
  getArchivedMessages }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(DashBoard);
