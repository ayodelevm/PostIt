import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../containers/LoginForm';

const LoginComponent = () => (
  <div id="login_form" className="col l4 m12 s12">
    <div className="row">
      <div className="col s12 m12 l12">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Login to your Account</span>
            <div className="divider" />
            <div className="row">
              <LoginForm />
            </div>
          </div>
          <div className="card-action">
            <span className="white-text">New to PostIt?</span>
            <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginComponent;
