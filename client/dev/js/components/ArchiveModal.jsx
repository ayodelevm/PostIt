import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import PropTypes from 'prop-types';

/**
 * Modal giving the presentational view for archiving messages
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const ArchiveModal = props => (

  <div id="archive-all" className="modal">
    <div className="row modal-close-div">
      <Link to={`/${props.closeModalRoute}`}
        className={'modal-action modal-close waves-effect waves-green btn-flat right'
          }
        >
        <i className="material-icons center">
            close
          </i>
      </Link>
    </div>

    <div className="row">
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card white">
          <div className="card-content black-text">
            <div className="row card-title-area">
              <span className="card-title create">
                  Archive All Messages in {props.name}
              </span>
              <p className="flow-text par grey-text">
                Are you sure you want to archive all messages in this group?
              </p>
            </div>
            <div className="row card-form-section">

              <form className="col s12"
                onSubmit={props.onHandleSubmit}
                noValidate>
                <div className="main">
                  <Notifications options={{ zIndex: 5000 }} />
                </div>
                <div className="divider" />
                <br />

                <div className="row">
                  <div className="input-field col s12">
                    <button
                      className={
                        'btn lime accent-4 right waves-effect waves-light center'
                        }
                      type="submit"
                      name="action"
                      >
                        Archive All
                      </button>
                  </div>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
  );

ArchiveModal.defaultProps = {
  state: {
    members: [],
    errors: {},
  }
};

ArchiveModal.propTypes = {
  name: PropTypes.string,
  closeModalRoute: PropTypes.string.isRequired,
  onHandleSubmit: PropTypes.func.isRequired
};

export default ArchiveModal;
