import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNewMessages } from '../actions/messageActions';
import MessagingFormComponent from '../components/MessagingFormComponent.jsx';

class MessagingForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // value: '0',
      message: '',
      errors: {},
      selected: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
  }

  logChange(val) {
    this.setState({
      selected: val
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const token = window.localStorage.token;
    const { groupId } = this.props;
    const data = { message: this.state.message, priority: this.state.selected.value };

    if (this.state.message !== '') {
      this.props.createNewMessages(token, data, groupId).then(() => {
        this.setState({ message: '', selected: '' });
      });
    }
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
      $('select').material_select();
      Materialize.updateTextFields();
      $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false,
        hover: true,
        gutter: 0,
        belowOrigin: true,
        alignment: 'left',
        stopPropagation: false
      }
  );
    });
  }

  render() {
    const options = [
      { value: 'Normal', label: 'Normal' },
      { value: 'Urgent', label: 'Urgent' },
      { value: 'Critical', label: 'Critical' }
    ];
    return (
      <MessagingFormComponent
        submit={this.handleFormSubmit}
        state={this.state} onChange={this.handleChange}
        name={this.state.name} id={this.state.id}
        options={options} logChange={this.logChange}
      />

    );
  }
}

MessagingForm.propTypes = {
  createNewMessages: PropTypes.func.isRequired,
  // eslint-disable-next-line
  groupResponse: PropTypes.object
};

const mapStateToProps = (state, props) => ({
  groupResponse: state.groupReducer,
  usersResponse: state.addUserReducer,
  messageResponse: state.messageReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ createNewMessages }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(MessagingForm);
