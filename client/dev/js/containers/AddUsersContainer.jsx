import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { addNewUsersToGroup } from '../actions/addUserActions';
import { getGroupUsers } from '../actions/groupActions';
import AddUsersModal from '../components/AddUsersModal.jsx';

class AddUsersContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newGroupMembers: [],
      createSuccess: false,
      errors: {}
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(chips) {
    this.setState({
      newGroupMembers: chips
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const token = window.localStorage.token;
    const { groupId } = this.props;
    this.props.addNewUsersToGroup(token, this.state, groupId)
    .then(
      () => {
        if (this.props.addUsersResponse.addSuccess) {
          notify.show('Members added successfully!', 'success', 5000);
          this.props.getGroupUsers(token, groupId);
          $('#add-new').modal('close');
        } else if (this.props.addUsersResponse.errors) {
          notify.show(this.props.addUsersResponse.errors.globals, 'warning', 5000);
        }
      }
    );
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal({
        dismissible: true,
        complete: () => {
          this.setState({
            newGroupMembers: [],
            errors: {}
          });
        }
      });
      Materialize.updateTextFields();
    });
  }

  render() {
    const allUsers = this.props.addUsersResponse.users;
    const groupMembers = this.props.groupMembers;
    let allusernames;
    if (groupMembers) {
      allusernames = allUsers.filter(user => !groupMembers
        .find(existing => existing.id === user.id))
        .map(user => user.username);
    }

    return (
      <AddUsersModal
        close={this.handleClose} submit={this.handleFormSubmit}
        state={this.state}
        onChipsChange={this.onChange} suggestions={allusernames}
        closeModalRoute={this.props.closeModalRoute}
      />

    );
  }
}

AddUsersContainer.propTypes = {
  addNewUsersToGroup: PropTypes.func.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
  addUsersResponse: PropTypes.object.isRequired,
  closeModalRoute: PropTypes.string.isRequired,
  groupId: PropTypes.number
};

const mapStateToProps = state => ({
//   groupResponse: state.groupReducer,
  addUsersResponse: state.addUserReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ addNewUsersToGroup, getGroupUsers }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(AddUsersContainer);
