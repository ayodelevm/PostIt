import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifications, { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createNewGroup } from '../actions/groupActions';
import { validateGroupInput } from '../utils/validations';

class GroupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      initialGroupMembers: '',
      createSuccess: false,
      errors: {},
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    e.persist();
    console.log('====state====', this.state);

    if (!!this.state.errors && this.state.errors[e.target.name]) {
      this.setState((prevState) => {
        const errors = Object.assign({}, prevState.errors);
        delete errors[e.target.name];

        return {
          [e.target.name]: e.target.value,
          errors
        };
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
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
          this.setState({ redirect: true });
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
            description: ''
          });
        }
      });
      Materialize.updateTextFields();
    });
  }

  render() {
    const form = (
      <form className="col s12" onSubmit={this.handleFormSubmit} noValidate>
        <div className="main">
          <Notifications options={{ zIndex: 15000 }} />
        </div>
        <div className="divider" />
        <br />
        <div className="row">
          <div className="input-field name-desc col s12">
            <input
              className={classnames({ 'has-error': !!this.state.errors.name })}
              placeholder="e.g learn-python" id="name" type="text"
              name="name" onChange={this.handleChange} value={this.state.name}
            />
            <label htmlFor="name">Name</label>
          </div>
          {Object.keys(this.state.errors).length ?
            <span className="left error-message grey-text">{this.state.errors.name}</span> :
            <p className="flow-text form grey-text">Names should be short and not more than 20 chracters</p>}
        </div>
        <div className="row">
          <div className="input-field name-desc col s12">
            <input
              name="description" onChange={this.handleChange} value={this.state.description}
              placeholder="Learn python" id="description" type="text"
            />
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
    );

    return (
      <div>
        {
          this.state.redirect ? <Redirect exact to={"/dashboard"} /> : form
        }
      </div>

    );
  }
}

GroupForm.propTypes = {
  createNewGroup: PropTypes.func.isRequired,
  // eslint-disable-next-line
  groupResponse: PropTypes.object
};

const mapStateToProps = state => ({
  groupResponse: state.groupReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ createNewGroup }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(GroupForm);
