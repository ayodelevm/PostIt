import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar-fixed">
    <nav className="lime-text accent-2 z-depth-0" role="navigation">
      <div className="nav-wrapper lime-text accent-2">
        <Link to="/home" href="#" className="brand-logo left">
          <i className="left large material-icons lime-text lighthen-5">insert_chart </i>
          <span id="site_name">PostIt</span>
        </Link>
        <a href="" data-activates="slide-out" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
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
    </nav>
  </div>
);

export default Nav;
