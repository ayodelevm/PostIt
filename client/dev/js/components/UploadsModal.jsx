import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Spinner from 'react-spinner-material';


/**
 * Gives the presentational view for profile picture uploads modal
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const UploadsModal = props => (
  <div id="user-new" className="modal">
    <div className="row modal-close-div">
      <Link to={`/${props.closeModalRoute}`}
        className={
          'modal-action modal-close waves-effect waves-green btn-flat right'
        }
      >
        <i className="material-icons center">close</i>
      </Link>
    </div>

    <div className="row">
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card white">
          <div className="card-content black-text">
            <div className="row card-title-area">
              <span
                className="card-title create"
              >Upload A New Profile Picture</span>
              <p className="flow-text par grey-text">
                Click inside the box below and select the picture you want to
                upload or drag an image into the box below
              </p>
            </div>
            <div className="row card-form-section">
              <Dropzone
                onDrop={props.onUploadFile}
              />

            </div>
            {
              props.loading ?
                <div className="before-auth-spinner">
                  <Spinner
                    size={120}
                    spinnerColor={'#333'}
                    spinnerWidth={2}
                    visible
                  />
                </div> :
                null
            }

          </div>

        </div>
      </div>
    </div>

  </div>
  );

UploadsModal.propTypes = {
  onUploadFile: PropTypes.func.isRequired,
  closeModalRoute: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default UploadsModal;
