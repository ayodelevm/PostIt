import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { createNewGroup } from '../actions/groupActions';
import { validateGroupInput } from '../utils/validations';
import GroupModal from '../components/GroupModal.jsx';

class GroupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      initialGroupMembers: [],
      createSuccess: false,
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleChange(e) {
    e.persist();
    if (!!this.state.errors && this.state.errors[e.target.name]) {
      this.setState((prevState) => {
        const errors = Object.assign({}, prevState.errors);
        delete errors[e.target.name];

        return {
          [e.target.name]: e.target.value,
          errors,
        };
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  onChange(chips) {
    this.setState({
      initialGroupMembers: chips
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const token = window.localStorage.token;
    const { isValid, errors } = validateGroupInput(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.setState({ errors: {} });
    this.props.createNewGroup(this.state, token)
    .then(
      () => {
        if (this.props.groupResponse.createSuccess) {
          notify.show('Group created successfully!', 'success', 10000);
          $('#group-new').modal('close');
        } else {
          if (this.props.groupResponse.errors.errors) {
            return this.setState({ errors: this.props.groupResponse.errors.errors });
          }
          notify.show(this.props.groupResponse.errors.globals, 'warning', 10000);
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
            name: '',
            description: '',
            initialGroupMembers: [],
            errors: {}
          });
        }
      });
      Materialize.updateTextFields();
    });
  }

  render() {
    const allUsers = this.props.usersResponse.users;
    const groupMembers = this.props.groupMembers;
    const currentUser = this.props.currentUser.currentUser;
    let allusernames;
    if (groupMembers !== undefined) {
      allusernames = allUsers.filter(user => !groupMembers
      .find(existing => existing.id === user.id))
      .map(user => user.username);
    } else {
      allusernames = allUsers.filter(user => user.id !== currentUser.id)
        .map(user => user.username);
    }

    return (
      <GroupModal
        close={this.handleClose} submit={this.handleFormSubmit}
        state={this.state} onChange={this.handleChange}
        name={this.state.name} error={this.state.errors.name}
        onChipsChange={this.onChange} suggestions={allusernames}
        closeModalRoute={this.props.closeModalRoute}
      />

    );
  }
}

GroupForm.propTypes = {
  createNewGroup: PropTypes.func.isRequired,
  // eslint-disable-next-line
  groupResponse: PropTypes.object
};

const mapStateToProps = state => ({
  groupResponse: state.groupReducer,
  usersResponse: state.addUserReducer,
  currentUser: state.authReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ createNewGroup }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(GroupForm);
