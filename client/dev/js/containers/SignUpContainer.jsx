import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifications, { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createNewUser, googleRegister } from '../actions/authActions';
import { validateInput } from '../utils/validations';
import SignUpComponent from '../components/SignUpComponent.jsx';
import InputFieldGroup from '../components/common/InputFields.jsx';


class SignUpForm extends React.Component {
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

  handleGoogleResponse(response) {
    if (response.error) {
      notify.show('SignUp unsuccessful, please try again later', 'warning', 10000);
    } else {
      this.props.googleRegister({ id_token: response.tokenObj.id_token })
        .then(
        () => {
          if (this.props.signupResponse.isAuthenticated) {
            this.setState({ redirect: true });
            notify.show('Welcome to PostIt!', 'success', 10000);
          } else {
            if (this.props.signupResponse.errors.errors) {
              return this.setState({ errors: this.props.signupResponse.errors.errors });
            }
            notify.show(this.props.signupResponse.errors.globals, 'warning', 10000);
            window.localStorage.removeItem('token');
          }
        }
      );
    }
  }

  handleChange(e) {
    e.persist();
    if (!!this.state.errors && this.state.errors[e.target.name]) {
      this.setState((prevState) => {
        const errors = Object.assign({}, prevState.errors);
        delete errors[e.target.name];

        return {
          [e.target.name]: e.target.value,
          errors
        };
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
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
            notify.show('Welcome to PostIt!', 'success', 10000);
          } else {
            if (this.props.signupResponse.errors.errors) {
              return this.setState({ errors: this.props.signupResponse.errors.errors });
            }
            notify.show(this.props.signupResponse.errors.globals, 'warning', 10000);
            window.localStorage.removeItem('token');
          }
        }
      );
  }

  render() {

    return (
      <div>
        {
          this.state.redirect ? <Redirect to="/dashboard" /> :
          <SignUpComponent
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

SignUpForm.defaultProps = {
  signupResponse: {}
};

SignUpForm.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  // eslint-disable-next-line
  signupResponse: PropTypes.object
};

const mapStateToProps = state => ({
  signupResponse: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ createNewUser, googleRegister }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(SignUpForm);
