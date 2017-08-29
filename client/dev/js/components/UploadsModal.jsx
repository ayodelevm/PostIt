import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';


const UploadsModal = (props) => {

  return (

    <div id="user-new" className="modal">
      <div className="row modal-close-div">
        <Link to={`/${props.closeModalRoute}`} className="modal-action modal-close waves-effect waves-green btn-flat right"><i className="material-icons center">close</i></Link>
      </div>

      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card white">
            <div className="card-content black-text">
              <div className="row card-title-area">
                <span className="card-title create">Upload A New Profile Picture</span>
              </div>
              <div className="row card-form-section">
                <Dropzone
                  onDrop={props.onUploadFile}
                />

              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

UploadsModal.defaultProps = {
  state: {
  }
};

UploadsModal.propTypes = {
  //eslint-disable-next-line
  state: PropTypes.object,
  onUploadFile: PropTypes.func.isRequired
};

export default UploadsModal;
