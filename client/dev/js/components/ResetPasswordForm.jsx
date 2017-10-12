import React from 'react';
import Notifications from 'react-notify-toast';
import PropTypes from 'prop-types';
import InputFieldGroup from './common/InputFields.jsx';
import parallaxImage from '../utils/images/jacob-ufkes-195221.jpg';

/**
 * Gives the presentational view for the form to enter new password
 * on password reset request
 * @param {object} props
 * @returns {void}
 */
const ResetPasswordForm = props => (
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
                <form className="col s12" onSubmit={props.onSubmit} noValidate>
                  <div className="main">
                    <Notifications />
                  </div>
                  <div className="divider" />
                  <br />

                  <div className="row">
                    <InputFieldGroup
                      name={'password'}
                      placeholder={'Your Password'}
                      id={'password'}
                      value={props.password}
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
                      placeholder={'Confirm Password'}
                      id={'passwordConfirmation'}
                      value={props.passwordConfirmation}
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
                    <div className="input-field col s12">
                      <button
                        className={'btn lime accent-4 waves-effect' +
                        ' waves-light center'}
                        type="submit"
                        name="action"
                      >
                        Reset Password
                        <i className="material-icons right">person</i>
                      </button>
                    </div>
                  </div>
                </form>

              </div>

            </div>
            <div className="card-action">
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

    <div className="parallax">
      <img
        className="responsive-img"
        src={parallaxImage}
        alt="login section"
      />
      <div id="overlay" />
    </div>
  </div>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired
};

export default ResetPasswordForm;
