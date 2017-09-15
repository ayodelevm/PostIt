import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNewMessages } from '../actions/messageActions';
import MessagingFormComponent from '../components/MessagingFormComponent.jsx';

/**
 * This class is the container component for creating a new message
 * It is responsible for managing all the state changes in the component
 */
class MessagingForm extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      // value: '0',
      message: '',
      errors: {},
      selected: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLogChange = this.handleLogChange.bind(this);
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
            message: '',
            selected: '',
          });
        }
      });
      $('.tooltipped').tooltip({ delay: 50 });
      $('select').material_select();
      Materialize.updateTextFields();
    });
  }

  /**
   * sets the state with the selected priority
   * @param {object} val
   * @returns {void}
   */
  handleLogChange(val) {
    this.setState({
      selected: val
    });
  }

  /**
   * sets the state with the form input
   * @param {object} e (i.e event)
   * @returns {void}
   */
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  /**
   * Validates that message is not empty and then makes a post request to the create new group endpoint,
   * handles response accordingly and then reset the state
   * @param {object} e (i.e event)
   * @returns {void}
   */
  handleFormSubmit(e) {
    e.preventDefault();

    const token = window.localStorage.token;
    const { groupId } = this.props;
    const data = { message: this.state.message, priority: this.state.selected.value };

    if (this.state.message !== '') {
      this.props.createNewMessages(token, data, groupId).then(() => {
        this.setState({ message: '', selected: '' });
      });
    }
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    const options = [
      { value: 'Normal', label: 'Normal' },
      { value: 'Urgent', label: 'Urgent' },
      { value: 'Critical', label: 'Critical' }
    ];
    return (
      <MessagingFormComponent
        onSubmit={this.handleFormSubmit}
        state={this.state} onChange={this.handleChange}
        name={this.state.name} id={this.state.id}
        options={options} onLogChange={this.handleLogChange}
      />

    );
  }
}

MessagingForm.propTypes = {
  createNewMessages: PropTypes.func.isRequired,
  groupId: PropTypes.number
};

const mapStateToProps = state => ({
  usersResponse: state.addUserReducer,
  messageResponse: state.messageReducer,
  notification: state.notificationReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ createNewMessages }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(MessagingForm);
