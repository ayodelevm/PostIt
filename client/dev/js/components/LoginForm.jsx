import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import Notifications from 'react-notify-toast';
import ForgotPassword from '../containers/ForgotPassword.jsx';
import InputFieldGroup from './common/InputFields.jsx';
import parallaxImage from '../utils/images/jacob-ufkes-195221.jpg';


/**
 * Gives the presentational view for the users login component
 * @param {object} props
 * @returns {void}
 */
const LoginForm = props => (
  <div className="parallax-container">
    <div className="container register center-align">
      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card white z-depth-5">
            <div className="card-head" />
            <div className="card-content black-text">
              <span className="card-title v-align">
                <a href="/" className="brand-logo">
                  <i
                    className="material-icons lime-text lighthen-5"
                  >
                    insert_chart
                  </i>
                  <span id="site_name">PostIt</span>
                </a>
              </span>
              <p>Log into your account.</p>
              <br />
              <br />

              <div className="row form-section">

                <p className="left">Required fields are marked *</p>

                <form
                  className="col s12"
                  onSubmit={props.onSubmit}
                  noValidate
                >
                  <div className="main">
                    <Notifications />
                  </div>
                  <div className="divider" />
                  <br />

                  <div className="row">
                    <InputFieldGroup
                      name={'userIdentifier'}
                      placeholder={'vic ayo'}
                      id={'userIdentifier'}
                      value={props.state.userIdentifier}
                      label={'Username or E-mail *'}
                      error={props.state.errors.userIdentifier}
                      type={'text'}
                      onChange={props.onChange}
                      htmlFor={'userIdentifier'}
                    />
                    <span
                      className="left error-messagegrey-text"
                    >
                      {props.state.errors.userIdentifier}
                    </span>
                  </div>
                  <div className="row">
                    <InputFieldGroup
                      name={'password'}
                      placeholder={'Your Password'}
                      id={'password'}
                      value={props.state.password}
                      label={'Password *'}
                      error={props.state.errors.password}
                      type={'password'}
                      onChange={props.onChange}
                      htmlFor={'password'}
                    />
                    <span
                      className="left error-message grey-text"
                    >
                      {props.state.errors.password}
                    </span>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button
                        className={'btn lime accent-4 waves-effect' +
                        ' waves-light center'}
                        type="submit" name="action"
                      >
                        Login
                        <i className="material-icons right">person</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="row">
                <p className="center">Forgot password?
                  <Link
                    to="#reset-email"
                    className="modal-trigger green-text darken-4"
                  >
                  Click here
                  </Link>
                  to reset it!
                </p>
              </div>
              <div className="row center">
                <span className="black-text">
                  You can also Login with
                </span><br />
                <GoogleLogin
                  clientId={props.clientId}
                  onSuccess={props.onSuccess}
                  onFailure={props.onFailure}
                  className={'google-login red'}
                >
                  <a
                    className={
                      'waves-effect waves-light' +
                      ' white-text btn-flat red'
                      }
                  >
                    Google+
                  </a>
                </GoogleLogin>
              </div>

            </div>
            <div className="card-action">
              <div className="card-action-text">
                <span className="black-text">New to PostIt? </span>
                <a
                  href="/register"
                  className="green-text darken-4"
                >
                  Create a new account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ForgotPassword
      />
    </div>

    <div className="parallax">
      <img
        className="responsive-img"
        src={parallaxImage}
        alt="login section"
      /><div id="overlay" />
    </div>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired
};

export default LoginForm;
