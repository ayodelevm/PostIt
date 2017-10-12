import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNewMessages } from '../actions/messageActions';
import MessageForm from '../components/MessageForm.jsx';

/**
 * This class is the container component for creating a new message
 * It is responsible for managing all the state changes in the component
 * @class MessageFormContainer
 * @extends {Component}
 */
export class MessageFormContainer extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {},
      selected: { value: 'Normal', label: 'Normal' }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLogChange = this.handleLogChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  /**
   * sets the state with the selected priority
   * @method handleLogChange
   * @memberof MessageFormContainer
   * @param {object} value
   * @returns {void}
   */
  handleLogChange(value) {
    this.setState({
      selected: value
    });
  }

  /**
   * sets the state with the form input
   * @method handleChange
   * @memberof MessageFormContainer
   * @param {object} event
   * @returns {void}
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * handles submit of text area and dropdown select content
   * @method handleKeyPress
   * @memberof MessageFormContainer
   * @param {object} event
   * @returns {void}
   */
  handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleFormSubmit(event);
    }
  }

  /**
   * Validates that message is not empty and then
   * makes a post request to the create new group endpoint,
   * handles response accordingly and then reset the state
   * @method handleFormSubmit
   * @memberof MessageFormContainer
   * @param {object} event
   * @returns {void}
   */
  handleFormSubmit(event) {
    event.preventDefault();

    const token = window.localStorage.token;
    const { groupId } = this.props;
    const message = {
      content: this.state.content,
      priority: this.state.selected.value
    };

    if (this.state.content !== '') {
      this.props.createNewMessages(token, message, groupId).then(() => {
        this.setState({
          content: '',
          selected: { value: 'Normal', label: 'Normal' }
        });
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
      <MessageForm
        onSubmit={this.handleFormSubmit}
        state={this.state} onChange={this.handleChange}
        options={options} onLogChange={this.handleLogChange}
        onKeyPress={this.handleKeyPress}
      />

    );
  }
}

MessageFormContainer.propTypes = {
  createNewMessages: PropTypes.func.isRequired,
  groupId: PropTypes.number
};

const mapStateToProps = state => ({
  usersResponse: state.userReducer,
  messageResponse: state.messageReducer,
  notification: state.notificationReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  createNewMessages
}, dispatch);

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(MessageFormContainer);
