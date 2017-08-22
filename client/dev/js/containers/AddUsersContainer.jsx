import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { addNewUsersToGroup } from '../actions/addUserActions';
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
        if (this.props.addUsersResponse.createSuccess) {
          notify.show('Members added successfully!', 'success', 10000);
          $('#add-new').modal('close');
        } else {
          if (this.props.addUsersResponse.errors.errors) {
            return this.setState({ errors: this.props.addUsersResponse.errors.errors });
          }
          notify.show(this.props.addUsersResponse.errors.globals, 'warning', 10000);
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
    const allusernames = allUsers.map((user) => {
      return user.username;
    });

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
  // eslint-disable-next-line
  addUsersResponse: PropTypes.object.isRequired,
  closeModalRoute: PropTypes.string.isRequired,
  groupId: PropTypes.number
};

const mapStateToProps = state => ({
//   groupResponse: state.groupReducer,
  addUsersResponse: state.addUserReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ addNewUsersToGroup }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(AddUsersContainer);
