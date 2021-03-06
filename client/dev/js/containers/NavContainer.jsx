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
 * @class NavContainer
 * @extends {Component}
 */
export class NavContainer extends React.Component {
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
   * @method handleLogout
   * @memberof NavContainer
   * @returns {void}
   */
  handleLogout() {
    this.props.logoutAUser();
    window.location.replace('/');
    notify.show('Logged out successfully!', 'success', 3000);
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    const { isAuthenticated } = this.props.logoutAction;

    const beforeAuth = (
      <div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="/register" className="lime-text lighthen-5">
              Create Account
            </a>
          </li>
          <li>
            <a href="/login" className="lime-text lighthen-5">Login</a>
          </li>
        </ul>

        <ul id="slide-out" className="side-nav">
          <li><div className="divider" /></li>
          <li className="active">
            <a href="/register" className="waves-effect waves-light">
              Create New Account
            </a>
          </li>
          <li><div className="divider" /></li>
          <li><a href="/login" className="waves-effect waves-light">
            Login</a>
          </li>
          <li><div className="divider" /></li>
        </ul>
      </div>
    );

    const afterAuth = (
      <div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link
            className="lime-text lighthen-5"
            to="/dashboard">Dashboard
            </Link>
          </li>
          <li><Link
            className="lime-text lighthen-5"
            onClick={this.handleLogout}
            to="/">Logout
            </Link>
          </li>
        </ul>

        <ul id="slide-out" className="side-nav">
          <li><div className="divider" /></li>
          <li><Link
            className="lime-text lighthen-5"
            to="/dashboard">Dashboard
            </Link>
          </li>
          <li><div className="divider" /></li>
          <li><a
            href="/"
            onClick={this.handleLogout}
            className="waves-effect waves-light">Logout
            </a>
          </li>
          <li><div className="divider" /></li>
          <li><a className="modal-trigger" href="#group-new">
            <span className="card-title black-text">
          CREATE GROUP <i className="material-icons right">
          add_box</i></span>
          </a>
          </li>
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

const matchDispatchToProps = dispatch => bindActionCreators({
  logoutAUser
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(NavContainer);

