import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


/**
 * Presentational view for personal groups displayed on dashboard area side nav
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const PersonalGroups = (props) => {
  const { group, onActiveGroupClicked } = props;
  return (
    <ul key={group.id} className="collapsible z-depth-0"
      data-collapsible="accordion">
      <li>
        <div className="group-display collapsible-header grey lighten-4">
          <span className="truncate">
            <i className="material-icons group-icons">
              lock_open</i> {group.name}
          </span><i className="material-icons right group-settings">
            arrow_drop_down</i>
        </div>

        <div className="collapsible-body ">
          <ul>
            <li><Link name={group.name}
              className="modal-trigger waves-effect waves-blue black-text"
              onClick={onActiveGroupClicked}
              id={group.id} to="#archive-all">Archive All Messages</Link>
            </li>
            <li><Link name={group.name}
              className="modal-trigger waves-effect waves-blue black-text"
              onClick={onActiveGroupClicked}
              id={group.id} to="#view-archive">View Archived Messages</Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
};

PersonalGroups.propTypes = {
  group: PropTypes.object.isRequired,
  onActiveGroupClicked: PropTypes.func.isRequired
};

export default PersonalGroups;
