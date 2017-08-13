import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { logoutAUser } from '../actions/authActions';

class NavButtons extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    // e.preventDefault();
    this.props.logoutAUser();
    // .then(() => {
    //   notify.show(this.props.logoutAction.successMessage, 'success', 10000);
    //   return <Redirect to="/" />;
    // });
    notify.show(this.props.logoutAction.successMessage, 'success', 10000);
    // return (
    //   <Redirect to="/" />
    // );
    window.location.href('/');
  }

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
          <li className="active"><a href="" className="lime-text lighthen-5"><i className="material-icons left">notifications</i><span id="notification-number">5</span></a></li>
          <li><a className="lime-text lighthen-5" href=""><i className="material-icons">people</i></a></li>
          <li><Link className="lime-text lighthen-5" onClick={this.logout} to="/">Logout</Link></li>
        </ul>

        <ul id="slide-out" className="side-nav">
          <li><div className="divider" /></li>
          <li className="active">
            <a href="" className="waves-effect waves-light"><i className="material-icons left">notifications</i><span id="notification-number">5</span></a>
          </li>
          <li><div className="divider" /></li>
          <li><a href="" className="waves-effect waves-light"><i className="material-icons">people</i></a></li>
          <li><div className="divider" /></li>
          <li><a href="/" onClick={this.logout} className="waves-effect waves-light">Logout</a></li>
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

NavButtons.propTypes = {
  logoutAUser: PropTypes.func.isRequired,
  // eslint-disable-next-line
  logoutAction: PropTypes.object
};

const mapStateToProps = state => ({
  logoutAction: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ logoutAUser }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(NavButtons);
