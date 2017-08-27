import React from 'react';
import SignUpForm from '../containers/SignUpForm.jsx';

const SignUpComponent = () => (
  <div className="parallax-container">
    <div className="container register center-align">
      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card white z-depth-5">
            <div className="card-head" />
            <div className="card-content black-text">
              <span className="card-title v-align"><a href="/" className="brand-logo"><i className="material-icons lime-text lighthen-5">insert_chart</i><span id="site_name">PostIt</span></a></span>
              <p>Sign up and start using PostIt for FREE.</p>
              <br />
              <br />

              <div className="row form-section">

                <p className="left">Required fields are marked *</p>
                <SignUpForm />
              </div>

            </div>
            <div className="card-action">
              <span className="black-text">Already have an account on PostIt? </span>
              <a href="/login" className="green-text darken-4">Sign into your account</a>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div className="parallax"><img className="responsive-img" src={require('../utils/images/jacob-ufkes-195221.jpg')} alt="register section" /><div id="overlay" />
    </div>
  </div>
);

export default SignUpComponent;
