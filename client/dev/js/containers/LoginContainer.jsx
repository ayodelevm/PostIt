import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifications, { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { loginAUser, googleLogin } from '../actions/authActions';
import { validateLoginInput } from '../utils/validations';
import LoginComponent from '../components/LoginComponent.jsx';
import InputFieldGroup from '../components/common/InputFields.jsx';


class LoginForm extends React.Component {
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

  componentDidMount() {
    $('.parallax').parallax();
  }

  handleGoogleResponse(response) {
    if (response.error) {
      notify.show('Login unsuccessful, please try again later', 'warning', 10000);
    } else {
      this.props.googleLogin({ id_token: response.tokenObj.id_token })
        .then(
      () => {
        if (this.props.loginResponse.isAuthenticated) {
          this.setState({ redirect: true });
          notify.show('Welcome back!', 'success', 10000);
        } else {
          if (this.props.loginResponse.errors.errors) {
            return this.setState({ errors: this.props.loginResponse.errors.errors });
          }
          notify.show(this.props.loginResponse.errors.globals, 'warning', 10000);
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
          notify.show('Welcome back!', 'success', 10000);
        } else {
          if (this.props.loginResponse.errors.errors) {
            return this.setState({ errors: this.props.loginResponse.errors.errors });
          }
          notify.show(this.props.loginResponse.errors.globals, 'warning', 10000);
          window.localStorage.removeItem('token');
        }
      }
    );
  }

  render() {

    return (
      <div>
        {
          this.state.redirect ? <Redirect push to="/dashboard" /> :
          <LoginComponent
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

LoginForm.defaultProps = {
  loginResponse: {}
};

LoginForm.propTypes = {
  loginAUser: PropTypes.func.isRequired,
  // eslint-disable-next-line
  loginResponse: PropTypes.object
};

const mapStateToProps = state => ({
  loginResponse: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ loginAUser, googleLogin }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(LoginForm);
