import React from 'react';
import { Link } from 'react-router-dom';

const GroupModal = () => (
  <div id="modal1" className="modal">
    <div className="row modal-close-div">
      <a href="" className="modal-action modal-close waves-effect waves-green btn-flat right"><i className="material-icons center">close</i></a>
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

              <form className="col s12">
                <div className="divider" />
                <br />
                <div className="row">
                  <div className="input-field name-desc col s12">
                    <input placeholder="e.g learn-python" id="name" type="text" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <p className="flow-text form grey-text">Names should be short and not more than 20 chracters</p>
                </div>
                <div className="row">
                  <div className="input-field name-desc col s12">
                    <input placeholder="Learn python" id="description" type="text" />
                    <label htmlFor="description">Purpose (optional)</label>
                  </div>
                  <p className="flow-text form grey-text">What is this group about?</p>
                </div>
                <div className="row chips-row">
                  <p className="flow-text above-chip">Add members to group (optional)</p>
                  <div className="chips chips-autocomplete" />
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

export default GroupModal;
