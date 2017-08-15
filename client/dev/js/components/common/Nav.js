import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import NavContainer from '../../containers/NavContainer';

const Nav = () => (
  <div className="navbar-fixed">
    {/* <div className="main">
      <Notifications options={{ zIndex: 5000 }} />
    </div>  */}
    <nav className="lime-text accent-2 z-depth-0" role="navigation">
      <div className="nav-wrapper lime-text accent-2">
        <Link to="/home" href="#" className="brand-logo left">
          <i className="left large material-icons lime-text lighthen-5">insert_chart </i>
          <span id="site_name">PostIt</span>
        </Link>
        <a href="" data-activates="slide-out" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <NavContainer />
      </div>
    </nav>
  </div>
);

export default Nav;
