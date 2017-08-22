import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import PropTypes from 'prop-types';
import Chips from 'react-chips';

const AddUsersModal = (props) => {

  return (

    <div id="add-new" className="modal">
      <div className="row modal-close-div">
        <Link to={`/${props.closeModalRoute}`} className="modal-action modal-close waves-effect waves-green btn-flat right"><i className="material-icons center">close</i></Link>
      </div>

      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card white">
            <div className="card-content black-text">
              <div className="row card-title-area">
                <span className="card-title create">Add New Members</span>
                <p className="flow-text par grey-text">Invite new members to {props.name}</p>
              </div>
              <div className="row card-form-section">

                <form className="col s12" noValidate>
                  <div className="main">
                    <Notifications options={{ zIndex: 5000 }} />
                  </div>
                  <div className="divider" />
                  <br />
                  <div className="row chips-row">
                    <p className="flow-text above-chip">Add members to group (optional)</p>
                    <Chips
                      value={props.state.newGroupMembers}
                      onChange={props.onChipsChange}
                      suggestions={props.suggestions}
                    />
                    <p className="flow-text below-chip grey-text">Search by username</p>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <a onClick={props.submit} href={`/${props.closeModalRoute}`} className="btn lime accent-4 right waves-effect waves-light center" >Add Users
                      </a>
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
};

AddUsersModal.defaultProps = {
  state: {
    newGroupMembers: [],
    errors: {},
  }
};

AddUsersModal.propTypes = {
  //eslint-disable-next-line
  state: PropTypes.object,
  //eslint-disable-next-line
  suggestions: PropTypes.array,
  onChipsChange: PropTypes.func.isRequired,
  closeModalRoute: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired
};

export default AddUsersModal;