import React from 'react';
import Notifications from 'react-notify-toast';
import Nav from './common/Nav.jsx';
import parallaxImage from '../utils/images/jacob-ufkes-195221.jpg';
import LandingFooter from './LandingFooter.jsx';

/**
 * Gives the presentational view for the landing page component
 * @param {object} props
 * @returns {void}
 */
const Landing = () => (
  <div>
    <div className="main">
      <Notifications />
    </div>
    <Nav />
    <div className="parallax-container valign-wrapper cloak">
      <div className="container landing center-align">
        <div className="row center-align">
          <div className="row  center">
            <p className="flow-text center white-text">
              Connecting with your friends and
              loved ones is just a message away!
            </p>
          </div>
          <div className="row landing-btn center-align">
            <a
              href="/register"
              className={'waves-effect waves-light' +
              ' btn-large btn-flat lime-text accent-2'}
            >
              Get Started With PostIt
            </a>
          </div>
        </div>

      </div>


      <div className="parallax">
        <img
          className="responsive-img"
          src={parallaxImage}
          alt="charity section"
        />
        <div id="overlay" />
      </div>
    </div>

    <div className="parallax-container2 valign-wrapper">
      <div className="paralax container landing center-align">
        <div className="row center-align">
          <div className="row  center">
            <p className="flow-text center white-text">
                Connecting with your friends and loved
                ones is just a message away!
              </p>
          </div>
          <div className="row landing-btn center-align">
            <a
              href="/register"
              className={'waves-effect waves-light' +
              ' btn-large btn-flat lime-text accent-2'}>
              Get Started With PostIt
            </a>
          </div>

        </div>

      </div>
    </div>
    <LandingFooter />
  </div>
);
export default Landing;
