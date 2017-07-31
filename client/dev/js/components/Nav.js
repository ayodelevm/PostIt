import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar-fixed">
    <nav className="purple darken-4">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo center">
          <i className="left large material-icons">insert_chart </i>
          <span id="site_name">PostIt</span>
        </Link>
        <a to="" data-activates="slide-out" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" className="right  hide-on-med-and-down">
          <li><Link to="/login">Login</Link></li>
          <li className="active"><Link to="/register">Create Account</Link></li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Nav;
