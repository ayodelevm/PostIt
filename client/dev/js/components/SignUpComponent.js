import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../containers/SignUpForm';

const SignUpComponent = () => (
  <div className="col l4 m12 s12">
    <div id="frame_1" className="row">
      <div className="col s12 m12 l12">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Create a New Account</span>
            <div className="divider" />
            <div id="frame_2">
              <div className="row">
                <SignUpForm />
              </div>
              <div className="card-action">
                <span className="white-text">Already have an account?</span>
                <Link to="/login">Login to PostIt</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignUpComponent;
