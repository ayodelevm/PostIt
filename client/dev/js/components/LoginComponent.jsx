import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../containers/LoginForm.jsx';
import ResetPasswordEmailContainer from '../containers/ResetPasswordEmailContainer.jsx';

/**
 * Gives the presentational view for the users login component
 * @param {object} props
 * @returns {void}
 */
const LoginComponent = () => (
  <div className="parallax-container">
    <div className="container register center-align">
      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card white z-depth-5">
            <div className="card-head" />
            <div className="card-content black-text">
              <span className="card-title v-align">
                <a href="/" className="brand-logo">
                  <i className="material-icons lime-text lighthen-5">insert_chart</i>
                  <span id="site_name">PostIt</span>
                </a>
              </span>
              <p>Log into your account.</p>
              <br />
              <br />

              <div className="row form-section">

                <p className="left">Required fields are marked *</p>
                <LoginForm />
              </div>
              <div className="row">
                <p className="center">Forgot password?
                  <Link to="#reset-email" className="modal-trigger green-text darken-4">
                  Click here</Link> to reset it!
                </p>
              </div>

            </div>
            <div className="card-action">
              <span className="black-text">New to PostIt? </span>
              <a href="/register" className="green-text darken-4">Create a new account</a>
            </div>
          </div>
        </div>
      </div>
      <ResetPasswordEmailContainer
        closeModalRoute={'login'}
      />
    </div>

    <div className="parallax">
      <img
        className="responsive-img"
        src={require('../utils/images/jacob-ufkes-195221.jpg')}
        alt="login section"
      /><div id="overlay" />
    </div>
  </div>
);

export default LoginComponent;
