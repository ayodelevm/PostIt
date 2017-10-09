import React from 'react';
import PropTypes from 'prop-types';

/**
 * Presentational view for group name and icon on message area side nav
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const AllGroups = (props) => {
  const { group, name } = props;
  return (
    <div key={group.id}>
      <li className="group-display">
        <a href={`/groups/${group.id}/message`}
          className="groups black-text">
          <span className="left truncate">
            <i className="material-icons group-icons">{name}
            </i> {group.name}</span><span className="right" />
        </a>
      </li>
      <br />
    </div>
  );
};

AllGroups.propTypes = {
  group: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default AllGroups;
