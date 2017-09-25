import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { addNewUsersToGroup } from '../actions/userActions';
import AddUsersModal from '../components/AddUsersModal.jsx';

/**
 * This class is the container component for adding users to a group
 * It is responsible for managing all the state changes in the component
 * @class AddUsers
 * @extends {Component}
 */
class AddUsers extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      createSuccess: false,
      errors: {}
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Updates the materialize modal when the component mounts
   * and resets form input when the component mounts
   * @returns {void}
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal({
        dismissible: true,
        complete: () => {
          this.setState({
            members: [],
            errors: {}
          });
        }
      });
      Materialize.updateTextFields();
    });
  }

  /**
   * This method takes in array of the users selected to be added to a group and sets the state
   * @method handleChange
   * @memberof AddUsers
   * @param {array} chips
   * @returns {void}
   */
  handleChange(chips) {
    this.setState({
      members: chips
    });
  }

  /**
   * Handles post request to the add new users endpoint
   * and handles response accordingly
   * @method handleFormSubmit
   * @memberof AddUsers
   * @param {object} event
   * @returns {void}
   */
  handleFormSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.token;
    const { groupId } = this.props;
    this.props.addNewUsersToGroup(token, this.state, groupId)
    .then(
      () => {
        if (this.props.addUsersResponse.addSuccess) {
          notify.show('Members added successfully!', 'success', 3000);
          $('#add-new').modal('close');
        } else if (this.props.addUsersResponse.errors) {
          notify.show(this.props.addUsersResponse.errors.globals, 'warning', 3000);
        }
      }
    );
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    const allUsers = this.props.addUsersResponse.users;
    const groupMembers = this.props.groupMembers;
    let allusernames;
    if (groupMembers) {
      allusernames = allUsers.filter(user => !groupMembers
        .find(existing => existing.id === user.id))
        .map(user => user.username);
    }

    return (
      <AddUsersModal
        onSubmit={this.handleFormSubmit}
        state={this.state}
        onChipsChange={this.handleChange} suggestions={allusernames}
        closeModalRoute={this.props.closeModalRoute}
      />

    );
  }
}

AddUsers.propTypes = {
  addNewUsersToGroup: PropTypes.func.isRequired,
  addUsersResponse: PropTypes.object.isRequired,
  closeModalRoute: PropTypes.string.isRequired,
  groupId: PropTypes.number,
  groupMembers: PropTypes.array
};

const mapStateToProps = state => ({
//   groupResponse: state.groupReducer,
  addUsersResponse: state.userReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ addNewUsersToGroup }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(AddUsers);
