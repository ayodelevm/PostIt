import React from 'react';

/**
 * Gives the presentational view for the footer component on landing page
 * @param {object} props
 * @returns {void}
 */
const LandingFooter = () => (
  <footer className="page-footer black">
    <div className="footer-copyright footer-ish">
      <div className="container lime-text lighthen-5">
        © 2017 Ayodele Victor
        <a
          className="right"
          href="https://github.com/ayodelevm/PostIt"
        >
          Check Code on GitHub
        </a>
      </div>
    </div>
  </footer>
);
export default LandingFooter;
