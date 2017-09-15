import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { logoutAUser } from '../actions/authActions';

/**
 * This class is the container component for switching nav content
 * based on whether the user is logged on or not
 * It is responsible for managing all the state changes in the component
 */
class NavContainer extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
   * Handles loging out a user and removing token from local storage
   * @returns {void}
   */
  handleLogout() {
    this.props.logoutAUser();
    notify.show('Logged out successfully!', 'success', 5000);
    window.location.replace('/');
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    const { isAuthenticated } = this.props.logoutAction;

    const beforeAuth = (
      <div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className="active">
            <a href="" className="lime-text lighthen-5">Site Guide</a>
          </li>
          <li>
            <a href="/register" className="lime-text lighthen-5">Create Account</a>
          </li>
          <li>
            <a href="/login" className="lime-text lighthen-5">Login</a>
          </li>
        </ul>

        <ul id="slide-out" className="side-nav">
          <li><div className="divider" /></li>
          <li className="active">
            <a href="/register" className="waves-effect waves-light">Create New Account</a>
          </li>
          <li><div className="divider" /></li>
          <li><a href="/login" className="waves-effect waves-light">Login</a></li>
          <li><div className="divider" /></li>
        </ul>
      </div>
    );

    const afterAuth = (
      <div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className="active"><a href="" className="lime-text lighthen-5">
            <i className="material-icons left">notifications</i><span id="notification-number">5</span></a></li>
          <li><Link className="lime-text lighthen-5" to="/dashboard">Dashboard</Link></li>
          <li><Link className="lime-text lighthen-5" onClick={this.handleLogout} to="/">Logout</Link></li>
        </ul>

        <ul id="slide-out" className="side-nav">
          <li><div className="divider" /></li>
          <li className="active">
            <a href="" className="waves-effect waves-light"><i className="material-icons left">notifications</i>
              <span id="notification-number">5</span></a>
          </li>
          <li><div className="divider" /></li>
          <li><Link className="lime-text lighthen-5" to="/dashboard">Dashboard</Link></li>
          <li><div className="divider" /></li>
          <li><a href="/" onClick={this.handleLogout} className="waves-effect waves-light">Logout</a></li>
          <li><div className="divider" /></li>
        </ul>
      </div>
    );

    return (
      <div>
        { isAuthenticated ? afterAuth : beforeAuth }
      </div>
    );
  }

}

NavContainer.propTypes = {
  logoutAUser: PropTypes.func.isRequired,
  logoutAction: PropTypes.object
};

const mapStateToProps = state => ({
  logoutAction: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ logoutAUser }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(NavContainer);

