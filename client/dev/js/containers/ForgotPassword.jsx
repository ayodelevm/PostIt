import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { forgotPassword } from '../actions/resetPasswordActions';
import { validateEmail } from '../utils/validations';
import ForgotPasswordModal from '../components/ForgotPasswordModal.jsx';

/**
 * This class is the container component for submitting email where reset
 * password link will be sent to and handling it's response
 * @class ForgotPassword
 * @extends {Component}
 */
class ForgotPassword extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Updates the materialize modal when the component mounts
   * and resets form input when the component mounts
   * @method componentDidMount
   * @memberof ForgotPassword
   * @returns {void}
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal({
        dismissible: true,
        complete: () => {
          this.setState({
            email: '',
            errors: {},
          });
        }
      });
      Materialize.updateTextFields();
    });
  }

  /**
   * Takes in the target object of the onclick event and sets the state
   * with the form input and new error object
   * @method handleChange
   * @memberof ForgotPassword
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
   * Validates form input. If there's error, sets State with the error
   * if no error, makes a post request to the forgotpassword endpoint
   * and handles response accordingly
   * @method handleFormSubmit
   * @memberof ForgotPassword
   * @param {object} event
   * @returns {void}
   */
  handleFormSubmit(event) {
    event.preventDefault();

    const { isValid, errors } = validateEmail(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.setState({ errors: {} });
    this.props.forgotPassword(this.state)
    .then(
      () => {
        if (this.props.resetResponse.emailVerified) {
          notify.show(`A link has been sent to your email,
            follow the link to reset your password`, 'success', 3000);
          $('#reset-email').modal('close');
        } else {
          if (this.props.resetResponse.errors.errors) {
            return this.setState({ errors: this.props.resetResponse.errors.errors });
          }
          notify.show(this.props.resetResponse.errors.globals, 'warning', 3000);
        }
      }
    );
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    return (
      <ForgotPasswordModal
        onSubmit={this.handleFormSubmit}
        value={this.state.email}
        state={this.state} onChange={this.handleChange}
        email={this.state.email} error={this.state.errors.name}
        closeModalRoute={this.props.closeModalRoute}
      />

    );
  }
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  resetResponse: PropTypes.object,
  closeModalRoute: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  resetResponse: state.resetPasswordReducer,
});

const matchDispatchToProps = dispatch => bindActionCreators({ forgotPassword }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(ForgotPassword);
