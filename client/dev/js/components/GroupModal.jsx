import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import PropTypes from 'prop-types';
import Chips from 'react-chips';
import InputFieldGroup from './common/InputFields.jsx';

/**
 * Modal for creating a new group. It also allows you to
 * add users to your group while creating
 * @param {object} props
 * @returns {jsx} - an xml/html -like syntax extension to javascript
 */
const GroupModal = props => (
  <div id="group-new" className="modal">
    <div className="row modal-close-div">
      <Link to={`/${props.closeModalRoute}`}
        className={
          'modal-action modal-close' +
          ' waves-effect waves-green btn-flat right'
          }
        onClick={props.onResetState}
          >
        <i className="material-icons center">close</i></Link>
    </div>

    <div className="row">
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card white">
          <div className="card-content black-text">
            <div className="row card-title-area">
              <span className="card-title create">
                Create a group
              </span>
              <p className="flow-text par grey-text">
                Groups are where you communicate with your friends,
                family and teams.
                They are best utilized when organized
                around a particular purpose
              </p>
            </div>
            <div className="row card-form-section">

              <form className="col s12" onSubmit={props.onSubmit} noValidate>
                <div className="main">
                  <Notifications options={{ zIndex: 5000 }} />
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
                  {
                    Object.keys(props.state.errors).length ?
                      <span className="left error-message grey-text">
                        {props.state.errors.name}
                      </span> :
                      <p className="flow-text form grey-text">
                      Names should be short and not more than 20 chracters
                    </p>
                  }
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
                  <p
                    className="flow-text form grey-text"
                  >
                    What is this group about?
                  </p>
                </div>
                <div className="row chips-row">
                  <p className="flow-text above-chip">
                    Add members to group (optional)
                  </p>
                  <Chips
                    value={props.state.members}
                    onChange={props.onChipsChange}
                    suggestions={props.suggestions}
                    />
                  <p
                    className="flow-text below-chip grey-text"
                  >
                  Search by username
                  </p>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <button
                      className={
                        'btn lime accent-4 right' +
                        ' waves-effect waves-light center'
                        }
                      type="submit"
                      name="action"
                    >
                      Create Group
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

GroupModal.defaultProps = {
  state: {
    name: '',
    description: '',
    members: [],
    createSuccess: false,
    errors: {},
  }
};

GroupModal.propTypes = {
  state: PropTypes.object,
  onChange: PropTypes.func,
  suggestions: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  onResetState: PropTypes.func.isRequired,
  onChipsChange: PropTypes.func.isRequired,
  closeModalRoute: PropTypes.string.isRequired,
};

export default GroupModal;
