import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifications, { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createNewUser } from '../actions/authActions';
import { validateInput } from '../utils/validations';


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
    const form = (
      <form className="col s12" onSubmit={this.handleFormSubmit} noValidate>
        <div className="main">
          <Notifications />
        </div>
        <div className="divider" />
        <br />
        <div className="row">
          <div className="input-field col s12">
            <input
              className={classnames({ 'has-error': !!this.state.errors.fullname })}
              placeholder="Victor ayo" id="fullname" type="text"
              name="fullname" onChange={this.handleChange} value={this.state.fullname}
            />
            <label htmlFor="fullname">Fullname *</label>
          </div>
          <span className="left error-message grey-text">{this.state.errors.fullname}</span>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              className={classnames({ 'has-error': !!this.state.errors.email })}
              placeholder="vicayo@domainname.com" id="email" type="email"
              name="email" onChange={this.handleChange} value={this.state.email}
            />
            <label htmlFor="email">Email *</label>
          </div>
          <span className="left error-message grey-text">{this.state.errors.email}</span>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              className={classnames({ 'has-error': !!this.state.errors.telephone })}
              placeholder="Mobile number" id="telephone" type="tel"
              name="telephone" onChange={this.handleChange} value={this.state.telephone}
            />
            <label htmlFor="telephone">Mobile number *</label>
          </div>
          <span className="left error-message grey-text">{this.state.errors.telephone}</span>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              className={classnames({ 'has-error': !!this.state.errors.username })}
              placeholder="John Doe" id="username" type="text"
              name="username" onChange={this.handleChange} value={this.state.username}
            />
            <label htmlFor="username">Username *</label>
          </div>
          <span className="left error-message grey-text">{this.state.errors.username}</span>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              className={classnames({ 'has-error': !!this.state.errors.password })}
              placeholder="Your Password" id="password" type="password"
              name="password" onChange={this.handleChange} value={this.state.password}
            />
            <label htmlFor="password">Password *</label>
          </div>
          <span className="left error-message grey-text">{this.state.errors.password}</span>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              className={classnames({ 'has-error': !!this.state.errors.passwordConfirmation })}
              placeholder="Confirm Password" id="passwordConfirmation" type="password"
              name="passwordConfirmation" onChange={this.handleChange} value={this.state.password2}
            />
            <label htmlFor="passwordConfirmation">Confirm Password *</label>
          </div>
          <span className="left error-message grey-text">{this.state.errors.passwordConfirmation}</span>
        </div>

        <div className="row">

          <div className="row">
            <div className="input-field col s12">
              <button className="btn lime accent-4 waves-effect waves-light center" type="submit" name="action">Create Account
                  <i className="material-icons right">person_add</i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );

    return (
      <div>
        {
          this.state.redirect ? <Redirect to="/dashboard" /> : form
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

const matchDispatchToProps = dispatch => bindActionCreators({ createNewUser }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(SignUpForm);
