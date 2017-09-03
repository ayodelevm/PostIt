import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { addNewUsersToGroup } from '../actions/addUserActions';
import { getGroupUsers } from '../actions/groupActions';
import AddUsersModal from '../components/AddUsersModal.jsx';

/**
 * This class is the container component for adding users to a group
 * It is responsible for managing all the state changes in the component
 */
class AddUsersContainer extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      newGroupMembers: [],
      createSuccess: false,
      errors: {}
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * This method takes in array of the users selected to be added to a group and sets the state
   * @param {array} chips
   * @returns {void}
   */
  onChange(chips) {
    this.setState({
      newGroupMembers: chips
    });
  }

  /**
   * 
   * @param {onSubmit} event
   */
  handleFormSubmit(e) {
    e.preventDefault();
    const token = window.localStorage.token;
    const { groupId } = this.props;
    this.props.addNewUsersToGroup(token, this.state, groupId)
    .then(
      () => {
        if (this.props.addUsersResponse.addSuccess) {
          notify.show('Members added successfully!', 'success', 5000);
          $('#add-new').modal('close');
        } else if (this.props.addUsersResponse.errors) {
          notify.show(this.props.addUsersResponse.errors.globals, 'warning', 5000);
        }
      }
    );
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal({
        dismissible: true,
        complete: () => {
          this.setState({
            newGroupMembers: [],
            errors: {}
          });
        }
      });
      Materialize.updateTextFields();
    });
  }

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
        close={this.handleClose} submit={this.handleFormSubmit}
        state={this.state}
        onChipsChange={this.onChange} suggestions={allusernames}
        closeModalRoute={this.props.closeModalRoute}
      />

    );
  }
}

AddUsersContainer.propTypes = {
  addNewUsersToGroup: PropTypes.func.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
  addUsersResponse: PropTypes.object.isRequired,
  closeModalRoute: PropTypes.string.isRequired,
  groupId: PropTypes.number
};

const mapStateToProps = state => ({
//   groupResponse: state.groupReducer,
  addUsersResponse: state.addUserReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ addNewUsersToGroup, getGroupUsers }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(AddUsersContainer);
