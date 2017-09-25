import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { createNewUser, googleRegister } from '../actions/authActions';
import { validateInput } from '../utils/validations';
import SignUpForm from '../components/SignUpForm.jsx';
/**
 * This class is the container component for registering a user
 * upon submission of signup form or upon verifcation by google and in-app verification
 * @class SignUpContainer
 * @extends {Component}
 */
class SignUpContainer extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      telephone: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      redirect: false,
      errors: {},
      loadig: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleGoogleResponse = this.handleGoogleResponse.bind(this);
  }

  /**
   * Takes in the response object from google after google validation,
   * handles the error if any, otherwise, makes a post request to the user google register endpoint
   * and handles response accordingly
   * @method handleGoogleResponse
   * @memberof SignUpContainer
   * @param {object} response
   * @returns {void}
   */
  handleGoogleResponse(response) {
    if (response.error) {
      notify.show('SignUp unsuccessful, please try again later', 'warning', 3000);
    } else {
      this.props.googleRegister({ id_token: response.tokenObj.id_token })
        .then(
        () => {
          if (this.props.signupResponse.isAuthenticated) {
            this.setState({ redirect: true });
            notify.show('Welcome to PostIt!', 'success', 3000);
          } else {
            if (this.props.signupResponse.errors.errors) {
              return this.setState({ errors: this.props.signupResponse.errors.errors });
            }
            notify.show(this.props.signupResponse.errors.globals, 'warning', 3000);
            window.localStorage.removeItem('token');
          }
        }
      );
    }
  }

  /**
   * Takes in the target object of the onclick event and sets the state
   * with the form input and new error object
   * @method handleChange
   * @memberof SignUpContainer
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
          errors
        };
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  /**
   * Validates form input. If there's error, sets State with the error
   * if no error, makes a post request to the register user endpoint
   * and handles response accordingly
   * @method handleFormSubmit
   * @memberof SignUpContainer
   * @param {object} event
   * @returns {void}
   */
  handleFormSubmit(event) {
    event.preventDefault();
    const { isValid, errors } = validateInput(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.setState({ errors: {} });
    this.props.createNewUser(this.state)
      .then(
        () => {
          if (this.props.signupResponse.isAuthenticated) {
            this.setState({ redirect: true });
            notify.show('Welcome to PostIt!', 'success', 3000);
          } else {
            if (this.props.signupResponse.errors.errors) {
              return this.setState({
                errors: this.props.signupResponse.errors.errors
              });
            }
            notify.show(this.props.signupResponse.errors.globals,
              'warning', 3000);
            window.localStorage.removeItem('token');
          }
        }
      );
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    return (
      <div>
        {
          this.state.redirect ? <Redirect to="/dashboard" /> :
          <SignUpForm
            state={this.state}
            onChange={this.handleChange}
            onSubmit={this.handleFormSubmit}
            clientId={'239318376704-022mld5juktsrae2384bbibcc2vlh5cv.apps.googleusercontent.com'}
            onSuccess={this.handleGoogleResponse}
            onFailure={this.handleGoogleResponse}
          />
        }
      </div>
    );
  }
}

SignUpContainer.defaultProps = {
  signupResponse: {}
};

SignUpContainer.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  googleRegister: PropTypes.func.isRequired,
  signupResponse: PropTypes.object
};

const mapStateToProps = state => ({
  signupResponse: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  createNewUser,
  googleRegister }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(SignUpContainer);
