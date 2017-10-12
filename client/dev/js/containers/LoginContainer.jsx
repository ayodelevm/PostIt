import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { loginAUser, googleLogin } from '../actions/authActions';
import { validateLoginInput } from '../utils/validations';
import LoginForm from '../components/LoginForm.jsx';

/**
 * This class is the container component for loging in a user
 * upon submission of login form or upon verifcation by
 * google and in-app verification
 * @class LoginContainer
 * @extends {Component}
 */
export class LoginContainer extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      userIdentifier: '',
      password: '',
      redirect: false,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleGoogleResponse = this.handleGoogleResponse.bind(this);
  }

  /**
   * initializes the component's parallax image and handles error notification
   * on user validation and redirect to login page
   * @method componentDidMount
   * @memberof LoginContainer
   * @returns {void}
   */
  componentDidMount() {
    if (this.props.history.action === 'REPLACE') {
      if (this.props.loginResponse.errors) {
        notify.show(this.props.loginResponse.errors.globals, 'warning', 3000);
      }
      notify.show(
        'Access denied! Please create an account or login first!',
        'warning', 3000);
    }
    $('.parallax').parallax();
  }

  /**
   * Takes in the response object from google after google validation,
   * handles the error if any, otherwise, makes a post request
   * to the user google login endpoint
   * and handles response accordingly
   * @method handleGoogleResponse
   * @memberof LoginContainer
   * @param {object} response
   * @returns {void}
   */
  handleGoogleResponse(response) {
    if (response.error) {
      notify
        .show('Login unsuccessful, please try again later', 'warning', 3000);
    } else {
      this.props.googleLogin({ id_token: response.tokenObj.id_token })
        .then(
      () => {
        if (this.props.loginResponse.isAuthenticated) {
          this.setState({ redirect: true });
          notify.show('Welcome back!', 'success', 3000);
        } else {
          if (this.props.loginResponse.errors.errors) {
            return this
              .setState({ errors: this.props.loginResponse.errors.errors });
          }
          notify
            .show(this.props.loginResponse.errors.globals, 'warning', 3000);
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
   * @memberof LoginContainer
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
   * if no error, makes a post request to the user login endpoint
   * and handles response accordingly
   * @method handleFormSubmit
   * @memberof LoginContainer
   * @param {object} event
   * @returns {void}
   */
  handleFormSubmit(event) {
    event.preventDefault();

    const { isValid, errors } = validateLoginInput(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.setState({ errors: {} });

    this.props.loginAUser(this.state)
    .then(
      () => {
        if (this.props.loginResponse.isAuthenticated) {
          this.setState({ redirect: true });
          notify.show('Welcome back!', 'success', 3000);
        } else {
          if (this.props.loginResponse.errors.errors) {
            return this
              .setState({ errors: this.props.loginResponse.errors.errors });
          }
          notify
            .show(this.props.loginResponse.errors.globals, 'warning', 3000);
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
          this.state.redirect ? <Redirect push to="/dashboard" /> :
          <LoginForm
            state={this.state}
            onChange={this.handleChange}
            onSubmit={this.handleFormSubmit}
            clientId={'239318376704-022mld5juktsrae2384bbibcc2vlh5cv' +
            '.apps.googleusercontent.com'}
            onSuccess={this.handleGoogleResponse}
            onFailure={this.handleGoogleResponse}
          />
        }
      </div>
    );
  }
}

LoginContainer.defaultProps = {
  loginResponse: {}
};

LoginContainer.propTypes = {
  loginAUser: PropTypes.func.isRequired,
  loginResponse: PropTypes.object,
  googleLogin: PropTypes.func.isRequired,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loginResponse: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  loginAUser,
  googleLogin
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(LoginContainer);
