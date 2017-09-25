import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { createNewGroup } from '../actions/groupActions';
import { validateGroupInput } from '../utils/validations';
import GroupModal from '../components/GroupModal.jsx';

/**
 * This class is the container component for creating a new group and adding new users when creating
 * It is responsible for managing all the state changes in the component
 * @class GroupFormContainer
 * @extends {Component}
 */
class GroupFormContainer extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      members: [],
      createSuccess: false,
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChipsChange = this.handleChipsChange.bind(this);
  }

  /**
   * Updates the materialize modal when the component mounts
   * and resets form input when the component mounts
   * @method componentDidMount
   * @memberof GroupFormContainer
   * @returns {void}
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal({
        dismissible: true,
        ready: () => {
          this.setState({
            name: '',
            description: '',
            members: [],
            errors: {}
          });
        }
      });
      $('.tooltipped').tooltip({ delay: 50 });
      Materialize.updateTextFields();
      $('.collapsible').collapsible({
        accordion: true,
      });
    });
  }

  /**
   * Takes in the target object of the onclick event and sets the state
   * with the form input and new error object
   * @method handleChange
   * @memberof GroupFormContainer
   * @param {object} event
   * @returns {void}
   */
  handleChange(event) {
    event.persist();
    if (!!this.state.errors && this.state.errors[event.target.name]) {
      this.setState((prevState) => {
        const errors = Object.assign({}, prevState.errors);
        delete errors[event.target.name];

        return {
          [event.target.name]: event.target.value,
          errors,
        };
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  /**
   * This method takes in array of the users selected to be added to a group and sets the state
   * @method handleChipsChange
   * @memberof GroupFormContainer
   * @param {array} chips
   * @returns {void}
   */
  handleChipsChange(chips) {
    this.setState({
      members: chips
    });
  }

  /**
   * Validates form input. If there's error, sets State with the error
   * if no error, makes a post request to the create new group endpoint
   * and handles response accordingly
   * @method handleFormSubmit
   * @memberof GroupFormContainer
   * @param {object} event
   * @returns {void}
   */
  handleFormSubmit(event) {
    event.preventDefault();

    const token = window.localStorage.token;
    const { isValid, errors } = validateGroupInput(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.setState({ errors: {} });
    this.props.createNewGroup(this.state, token)
    .then(
      () => {
        if (this.props.groupResponse.createSuccess) {
          notify.show('Group created successfully!', 'success', 3000);
          this.setState({ name: '', description: '', members: [] });
          $('#group-new').modal('close');
        } else {
          if (this.props.groupResponse.errors.errors) {
            return this.setState({ errors: this.props.groupResponse.errors.errors });
          }
          notify.show(this.props.groupResponse.errors.globals, 'warning', 3000);
        }
      }
    );
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    const allUsers = this.props.usersResponse.users;
    const groupMembers = this.props.groupMembers;
    const currentUser = this.props.currentUser.currentUser;
    let allusernames;
    if (groupMembers !== undefined) {
      allusernames = allUsers.filter(user => !groupMembers
      .find(existing => existing.id === user.id))
      .map(user => user.username);
    } else {
      allusernames = allUsers.filter(user => user.id !== currentUser.id)
        .map(user => user.username);
    }

    return (
      <GroupModal
        onSubmit={this.handleFormSubmit}
        state={this.state} onChange={this.handleChange}
        name={this.state.name} error={this.state.errors.name}
        onChipsChange={this.handleChipsChange} suggestions={allusernames}
        closeModalRoute={this.props.closeModalRoute}
      />

    );
  }
}

GroupFormContainer.propTypes = {
  createNewGroup: PropTypes.func.isRequired,
  groupResponse: PropTypes.object,
  usersResponse: PropTypes.object,
  groupMembers: PropTypes.array,
  closeModalRoute: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupResponse: state.groupReducer,
  usersResponse: state.userReducer,
  currentUser: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ createNewGroup }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(GroupFormContainer);
