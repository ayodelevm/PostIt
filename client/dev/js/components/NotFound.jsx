import React from 'react';

/**
 * Gives the presentational view for the Not Found page
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const NotFound = () => (
  <div id="message-board-background" className="center">
    <h1>The Page You Are Looking For Was Not Found!</h1>
    <h4>
      Click <a href="/dashboard">here</a> to go back to your dashboard!
    </h4>
  </div>
  );

export default NotFound;
