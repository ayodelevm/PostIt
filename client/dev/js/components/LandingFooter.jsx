import React from 'react';

/**
 * Gives the presentational view for the footer component on landing page
 * @param {object} props
 * @returns {void}
 */
const LandingFooter = () => (
  <footer className="page-footer transparent">
    <div className="footer-copyright footer-ish blue-grey darken-2">
      <div className="container">
      © 2017 Ayodele Victor
      <a className="grey-text text-lighten-4 right" href="#!">Check Code on GitHub</a>
      </div>
    </div>
  </footer>
);
export default LandingFooter;
