import React from 'react';
import NavContainer from '../../containers/NavContainer.jsx';

/**
 * Navbar presentational component
 * @param {object} props
 * @returns {void}
 */
const Nav = () => (
  <div className="navbar-fixed">
    <nav className="lime-text accent-2 z-depth-0" role="navigation">
      <div className="nav-wrapper lime-text accent-2">
        <a href="/" className="brand-logo left">
          <i className="left large material-icons lime-text lighthen-5">
            insert_chart </i>
          <span id="site_name">PostIt</span>
        </a>
        <a href="" data-activates="slide-out" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <NavContainer />
      </div>
    </nav>
  </div>
);

export default Nav;
