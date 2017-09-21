import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllGroups } from '../actions/groupActions';
import { getAllUsers } from '../actions/userActions';
import { selectedGroupDetails, getArchivedMessages } from '../actions/archiveActions';
import Dashboard from '../components/Dashboard.jsx';

/**
 * This class is the container component for the users dashboard
 * It is responsible for managing all the state changes in the component
 */
export class DashBoardContainer extends React.Component {
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
   * @returns {void}
   */
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

  /**
   * Takes in the target object of the onclick event and passes an object
   * containging the clicked group's id and name to the redux store
   * then fetches all archived messages in the clicked group
   * @param {object} e (i.e event)
   * @returns {void}
   */
  handleActiveGroupClicked(e) {
    e.preventDefault();
    const token = window.localStorage.token;

    Promise.resolve(
      this.props.selectedGroupDetails({ id: e.target.id, name: e.target.name })
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
      <Dashboard
        archivedMessages={this.props.archiveData.archivedMessages}
        groups={this.props.getAllGroupsResponse.groups}
        users={this.props.getAllUsersResponse.users}
        currentUser={this.props.currentUser.currentUser}
        onActiveGroupClicked={this.handleActiveGroupClicked}
      />
    );
  }
}

DashBoardContainer.propTypes = {
  getAllGroups: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getArchivedMessages: PropTypes.func.isRequired,
  selectedGroupDetails: PropTypes.func.isRequired,
  getAllGroupsResponse: PropTypes.object,
  getAllUsersResponse: PropTypes.object,
  currentUser: PropTypes.object,
  archiveData: PropTypes.object
};

const mapStateToProps = state => ({
  getAllGroupsResponse: state.groupReducer,
  getAllUsersResponse: state.userReducer,
  currentUser: state.authReducer,
  archiveData: state.archiveReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ getAllGroups,
  getAllUsers,
  selectedGroupDetails,
  getArchivedMessages }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(DashBoardContainer);
