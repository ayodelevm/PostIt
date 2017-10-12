import React from 'react';
import PropTypes from 'prop-types';

/**
 * Presentational view for all groups displayed on the main dashoboard
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const AllGroups = (props) => {
  const { group } = props;
  return (
    <div key={group.id} className="col s12 m6">
      <div className="card horizontal">
        <div className="card-image">
          <img src="https://lorempixel.com/100/190/nature/6"
            alt="dashboard" />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <h5>{group.name}</h5>
            <p className="flow-text description">
              {group.description}
            </p>
          </div>
          <div className="card-action">
            <a href={`/groups/${group.id}/message`}>Open</a>
          </div>
        </div>
      </div>
    </div>
  );
};

AllGroups.propTypes = {
  group: PropTypes.object.isRequired,
};

export default AllGroups;
