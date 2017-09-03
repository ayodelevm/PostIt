import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from 'react-notify-toast';
import { getGroupWithMessages, archiveMessages } from '../actions/archiveActions';
import { getOneGroupWithMessages } from '../actions/messageActions';
import { getGroupUsers, getAllGroups } from '../actions/groupActions';
import { getAllUsers } from '../actions/addUserActions';
import ArchiveAllModal from '../components/ArchiveAllModal.jsx';

class ArchiveAllContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageIds: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const token = window.localStorage.token;
    const { setGroupDetails, getSuccess } = this.props.archiveData;
    this.props.getGroupWithMessages(token, setGroupDetails.id)
    .then(() => {
      if (this.props.archiveData.getSuccess) {
        const fetchedMessages = this.props.archiveData.archivableMessages.Messages;
        const messageIds = fetchedMessages.map(message => message.id);
        this.setState({
          messageIds
        });
      }
    })
    .then(() => {
      return this.props.archiveMessages(token, this.state, setGroupDetails.id);
    })
    .then(() => {
      if (this.props.archiveData.archiveSuccess) {
        notify.show('Messages have been archived successfully!', 'success', 5000);
        $('#archive-all').modal('close');
      } else {
        notify.show(this.props.archiveData.errors.globals, 'warning', 5000);
        $('#archive-all').modal('close');
      }
    });
  }

  render() {
    return (
      <ArchiveAllModal
        name={this.props.archiveData.setGroupDetails ? this.props.archiveData.setGroupDetails.name : ''}
        closeModalRoute={this.props.closeModalRoute}
        onHandleSubmit={this.handleSubmit}
      />
    );
  }
}

ArchiveAllContainer.propTypes = {
  getGroupUsers: PropTypes.func.isRequired,
  getOneGroupWithMessages: PropTypes.func.isRequired,
  getAllGroups: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
  groupMessages: PropTypes.object,
  // eslint-disable-next-line
  archiveData: PropTypes.object,
  // eslint-disable-next-line
  currentUser: PropTypes.object,
  // eslint-disable-next-line  
  allUsersData: PropTypes.object
};

const mapStateToProps = state => ({
  archiveData: state.archiveReducer,
  router: state.router,
  currentUser: state.authReducer,
  groupMessages: state.messageReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getGroupUsers, getGroupWithMessages, getOneGroupWithMessages, getAllGroups, getAllUsers, archiveMessages
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(ArchiveAllContainer);
