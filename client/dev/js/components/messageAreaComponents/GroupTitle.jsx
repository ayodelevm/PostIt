import React from 'react';
import PropTypes from 'prop-types';

/**
 * Presentational view for group title and icon on message board
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const GroupTitle = (props) => {
  const { messages, name } = props;
  return (
    <div>
      <h5 className="group-title">
        <i className="material-icons group-icons">
          {name}
        </i> {messages.name}
      </h5>
      <div className="row adjust">
        <span className="group-description">
          {messages.description}
        </span>
      </div>
    </div>
  );
};

GroupTitle.propTypes = {
  messages: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default GroupTitle;
