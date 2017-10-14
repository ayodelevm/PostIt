import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from 'react-notify-toast';
import {
  getGroupWithMessages,
  archiveMessages
} from '../actions/archiveActions';
import ArchiveModal from '../components/ArchiveModal.jsx';

/**
 * This class is the container component for archiving all messages in a group
 * It is responsible for managing all the state changes in the component
 * @class Archive
 * @extends {Component}
 */
export class Archive extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      messageIds: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Hanldes post request to the archive all endpoint
   * and handles response accordingly
   * @method handleSubmit
   * @memberof Archive
   * @param {object} event
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();

    const token = window.localStorage.token;
    const { setGroupDetails } = this.props.archiveData;
    this.props.getGroupWithMessages(token, setGroupDetails.id)
    .then(() => {
      if (this.props.archiveData.getSuccess) {
        const fetchedMessages = this.props.archiveData
          .archivableMessages.Messages;
        const messageIds = fetchedMessages.map(message => message.id);
        this.setState({
          messageIds
        });
      }
    })
    .then(() => this.props
    .archiveMessages(token, this.state, setGroupDetails.id))
    .then(() => {
      if (this.props.archiveData.archiveSuccess) {
        notify
          .show('Messages have been archived successfully!', 'success', 3000);
        $('#archive-all').modal('close');
      } else {
        notify.show(this.props.archiveData.errors.globals, 'warning', 3000);
      }
    });
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    return (
      <ArchiveModal
        name={this.props.archiveData.setGroupDetails ?
        this.props.archiveData.setGroupDetails.name : ''}
        closeModalRoute={this.props.closeModalRoute}
        onHandleSubmit={this.handleSubmit}
      />
    );
  }
}

Archive.propTypes = {
  getGroupWithMessages: PropTypes.func.isRequired,
  archiveMessages: PropTypes.func.isRequired,
  closeModalRoute: PropTypes.string.isRequired,
  archiveData: PropTypes.object
};

const mapStateToProps = state => ({
  archiveData: state.archiveReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getGroupWithMessages, archiveMessages
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Archive);
