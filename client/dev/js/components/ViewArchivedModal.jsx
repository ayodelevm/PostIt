import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import RenderMessage from './MessageArea/RenderMessage.jsx';

/**
 * Gives the presentational view for displaying archived messages
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const ViewArchivedModal = (props) => {
  const { Messages } = props.archivedMessages;
  return (

    <div id="view-archive" className="modal">
      <div className="row modal-close-div">
        <Link
          to={`/${props.closeModalRoute}`}
          className={
            'modal-action modal-close waves-effect waves-green btn-flat right'
          }
        >
          <i className="material-icons center"
          >close</i>
        </Link>
      </div>

      <div className="row archive-modal">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card white archive-form">
            <div className="card-content black-text">
              <div className="row card-title-area">
                <span
                  className="card-title create"
                >Archived Messages for {props.archivedMessages.name}</span>
              </div>
              <div className="row card-form-section">

                <form className="col s12" noValidate>

                  <div className="divider" />
                  <br />
                  {Messages && Messages.length !== 0 ?
                    Messages.map(message => (
                      <RenderMessage
                        users={props.users}
                        message={message}
                        key={message.id}
                          />
                      )
                    ) :
                    <h6>
                      There are currently no archived messages in this group
                    </h6>
                  }
                </form>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

ViewArchivedModal.propTypes = {
  archivedMessages: PropTypes.object,
  users: PropTypes.array,
  closeModalRoute: PropTypes.string.isRequired
};

export default ViewArchivedModal;
