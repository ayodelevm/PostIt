import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Presentational view for action icons on message board
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const MessageBoardIcons = (props) => {
  const {
    onActiveGroupClicked, messages, groupAdd, archive, view, valid
  } = props;
  return (
    <div>
      <ul className="group-icons">
        <li><Link className="modal-trigger tooltipped"
          data-position="top" data-tooltip="Add new members"
          to="#add-new"><i className="material-icons left">{groupAdd}</i>
        </Link>
        </li>
        <li><Link className="modal-trigger tooltipped"
          data-position="bottom" data-tooltip="View members"
          to="#group-members"><i className="material-icons left">group</i>
        </Link>
        </li>
        <li><a href="" className="dropdown-button tooltipped"
          data-position="top" data-tooltip="Archives"
          data-activates="archive-dropdown">
          <i className="material-icons">settings</i></a>
        </li>
      </ul>
      <ul id="archive-dropdown" className="dropdown-content">
        {valid ?
          <li><Link name={messages.name}
            className="modal-trigger waves-effect waves-blue black-text"
            onClick={onActiveGroupClicked}
            id={messages.id} to="#archive-all">{archive}</Link>
          </li> :
          null
        }
        <li><Link name={messages.name}
          className="modal-trigger waves-effect waves-blue black-text"
          onClick={onActiveGroupClicked}
          id={messages.id} to="#view-archive">{view}</Link>
        </li>
      </ul>
    </div>
  );
};

MessageBoardIcons.propTypes = {
  messages: PropTypes.object.isRequired,
  onActiveGroupClicked: PropTypes.func.isRequired,
  groupAdd: PropTypes.string.isRequired,
  archive: PropTypes.string,
  view: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default MessageBoardIcons;
