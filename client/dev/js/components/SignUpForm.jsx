import React from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import GoogleLogin from 'react-google-login';
import InputFieldGroup from './common/InputFields.jsx';

/**
 * Gives the presentational view for users signup component
 * @param {object} props
 * @returns {void}
 */
const SignUpForm = props => (
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
                </a></span>
              <p>Sign up and start using PostIt for FREE.</p>
              <br />
              <br />

              <div className="row form-section">

                <p className="left">Required fields are marked *</p>
                <form className="col s12" onSubmit={props.onSubmit} noValidate>
                  <div className="main">
                    <Notifications />
                  </div>
                  <div className="divider" />
                  <br />
                  <div className="row">
                    <InputFieldGroup
                      name={'fullname'}
                      placeholder={'Victor Ayo'}
                      id={'userIdentifier'}
                      value={props.state.fullname}
                      label={'Fullname *'}
                      error={props.state.errors.fullname}
                      type={'text'}
                      onChange={props.onChange}
                      htmlFor={'fullname'}
                    />
                    <span
                      className="left error-message grey-text"
                    >
                      {props.state.errors.fullname}
                    </span>
                  </div>
                  <div className="row">
                    <InputFieldGroup
                      name={'email'}
                      placeholder={'vicayo@domainname.com'}
                      id={'email'}
                      value={props.state.email}
                      label={'Email *'}
                      error={props.state.errors.email}
                      type={'email'}
                      onChange={props.onChange}
                      htmlFor={'email'}
                    />
                    <span
                      className="left error-message grey-text"
                    >
                      {props.state.errors.email}
                    </span>
                  </div>
                  <div className="row">
                    <InputFieldGroup
                      name={'telephone'}
                      placeholder={'+2348167845633'}
                      id={'telephone'}
                      value={props.state.telephone}
                      label={'Mobile number *'}
                      error={props.state.errors.telephone}
                      type={'tel'}
                      onChange={props.onChange}
                      htmlFor={'telephone'}
                    />
                    <span
                      className="left error-message grey-text"
                    >
                      {props.state.errors.telephone}
                    </span>
                  </div>
                  <div className="row">
                    <InputFieldGroup
                      name={'username'}
                      placeholder={'vicayo'}
                      id={'username'}
                      value={props.state.username}
                      label={'Username *'}
                      error={props.state.errors.username}
                      type={'text'}
                      onChange={props.onChange}
                      htmlFor={'username'}
                    />
                    <span
                      className="left error-message grey-text"
                    >
                      {props.state.errors.username}
                    </span>
                  </div>
                  <div className="row">
                    <InputFieldGroup
                      name={'password'}
                      placeholder={'Your password'}
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
                    <InputFieldGroup
                      name={'passwordConfirmation'}
                      placeholder={'Confirm password'}
                      id={'passwordConfirmation'}
                      value={props.state.passwordConfirmation}
                      label={'Confirm Password *'}
                      error={props.state.errors.passwordConfirmation}
                      type={'password'}
                      onChange={props.onChange}
                      htmlFor={'passwordConfirmation'}
                    />
                    <span
                      className="left error-message grey-text"
                    >
                      {props.state.errors.passwordConfirmation}
                    </span>
                  </div>

                  <div className="row">

                    <div className="row">
                      <div className="input-field col s12">
                        <button
                          className={'btn lime accent-4 waves-effect' +
                          ' waves-light center'}
                          type="submit" name="action">Create Account
                          <i className="material-icons right">person_add</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="row center">
                <span
                  className="black-text"
                > You can also SignUp with </span><br />
                <GoogleLogin
                  clientId={props.clientId}
                  onSuccess={props.onSuccess}
                  onFailure={props.onFailure}
                  className={'google-login red'}
                >
                  <a
                    className={'waves-effect waves-light' +
                    ' white-text btn-flat red'}
                  >
                    Google+
                  </a>
                </GoogleLogin>
              </div>

            </div>
            <div className="card-action">
              <div className="card-action-text">
                <span className="black-text">
                  Already have an account on PostIt? </span>
                <a href="/login" className="green-text darken-4">
                  Sign into your account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div className="parallax"><img className="responsive-img"
      src={require('../utils/images/jacob-ufkes-195221.jpg')}
      alt="register section" /><div id="overlay" />
    </div>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired
};

export default SignUpForm;
