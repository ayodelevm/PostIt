import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import PropTypes from 'prop-types';
import InputFieldGroup from './common/InputFields.jsx';

/**
 * Gives the presentational view for the form for submitting email where reset
 * password link will be sent to
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const ResetPasswordEmailModal = (props) => {
  return (

    <div id="reset-email" className="modal">
      <div className="row modal-close-div">
        <Link to={`/${props.closeModalRoute}`} className="modal-action modal-close waves-effect waves-green btn-flat right"><i className="material-icons center">close</i></Link>
      </div>

      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card white">
            <div className="card-content black-text">
              <div className="row card-title-area">
                <span className="card-title create">Reset Password</span>
                <p className="flow-text par grey-text">Enter the email you signed up with and you will receive a link to help you reset your password</p>
              </div>
              <div className="row card-form-section">

                <form className="col s12" onSubmit={props.onSubmit} noValidate>
                  <div className="main">
                    <Notifications options={{ zIndex: 5000 }} />
                  </div>
                  <div className="divider" />
                  <br />
                  <div className="row chips-row">
                    <div className="row">
                      <InputFieldGroup
                        name={'email'}
                        placeholder={'e.g learn-python'}
                        id={'email'}
                        value={props.value}
                        label={'email (Required)'}
                        error={props.state.errors.email}
                        type={'email'}
                        onChange={props.onChange}
                        htmlFor={'email'}
                      />
                      {Object.keys(props.state.errors).length ?
                        <span className="left error-message grey-text">{props.state.errors.email}</span> :
                        <p className="flow-text form grey-text">Please enter the email you signed-up with</p>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button className="btn lime accent-4 right waves-effect waves-light center" type="submit" name="action">Submit Email
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
};

ResetPasswordEmailModal.defaultProps = {
  state: {
    newGroupMembers: [],
    errors: {},
  }
};

ResetPasswordEmailModal.propTypes = {
  state: PropTypes.object,
  closeModalRoute: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ResetPasswordEmailModal;
