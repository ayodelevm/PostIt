import React from 'react';
import { Link } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import Chips, { Chip } from 'react-chips';
import GroupForm from '../containers/GroupForm';
import InputFieldGroup from './common/InputFields';


const GroupModal = (props) => {

  return (

    <div id="group-new" className="modal">
      <div className="row modal-close-div">
        <Link to="/dashboard" className="modal-action modal-close waves-effect waves-green btn-flat right"><i className="material-icons center">close</i></Link>
      </div>

      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card white">
            <div className="card-content black-text">
              <div className="row card-title-area">
                <span className="card-title create">Create a group</span>
                <p className="flow-text par grey-text">Groups are where you communicate with your friends, family and teams. They are best utilized when organized around a particular purpose</p>
              </div>
              <div className="row card-form-section">

                <form className="col s12" onSubmit={props.submit} noValidate>
                  <div className="main">
                    <Notifications options={{ zIndex: 15000 }} />
                  </div>
                  <div className="divider" />
                  <br />
                  <div className="row">
                    <InputFieldGroup
                      name={'name'}
                      placeholder={'e.g learn-python'}
                      id={'name'}
                      value={props.state.name}
                      label={'name (Required)'}
                      error={props.state.errors.name}
                      type={'text'}
                      onChange={props.onChange}
                      htmlFor={'name'}
                    />
                    {Object.keys(props.state.errors).length ?
                      <span className="left error-message grey-text">{props.state.errors.name}</span> :
                      <p className="flow-text form grey-text">Names should be short and not more than 20 chracters</p>}
                  </div>
                  <div className="row">
                    <InputFieldGroup
                      name={'description'}
                      placeholder={'Learn python'}
                      id={'description'}
                      value={props.state.description}
                      label={'purpose (optional)'}
                      error={props.state.errors.description}
                      type={'text'}
                      onChange={props.onChange}
                      htmlFor={'description'}
                    />
                    <p className="flow-text form grey-text">What is this group about?</p>
                  </div>
                  <div className="row chips-row">
                    <p className="flow-text above-chip">Add members to group (optional)</p>
                    <Chips
                      value={props.state.initialGroupMembers}
                      onChange={props.onChipsChange}
                      suggestions={props.suggestions}
                    />
                    <p className="flow-text below-chip grey-text">Search by username</p>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button className="btn lime accent-4 right waves-effect waves-light center" type="submit" name="action">Create Group
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

GroupModal.defaultProps = {
  state: {
    name: '',
    description: '',
    initialGroupMembers: [],
    createSuccess: false,
    errors: {},
  }
};

GroupModal.propTypes = {
  //eslint-disable-next-line
  state: PropTypes.object,
  onChange: PropTypes.func
};

export default GroupModal;
