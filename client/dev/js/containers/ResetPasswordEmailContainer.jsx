import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { forgotPassword } from '../actions/resetPasswordActions';
import { validateEmail } from '../utils/validations';
import ResetPasswordEmailModal from '../components/ResetPasswordEmailModal.jsx';

class ResetPasswordEmailContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleFormSubmit(e) {
    e.preventDefault();

    const { isValid, errors } = validateEmail(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.setState({ errors: {} });
    this.props.forgotPassword(this.state)
    .then(
      () => {
        if (this.props.resetResponse.emailVerified) {
          notify.show('A link has been sent to your email, follow the link to reset your password', 'success', 5000);
          $('#reset-email').modal('close');
        } else {
          if (this.props.resetResponse.errors.errors) {
            return this.setState({ errors: this.props.resetResponse.errors.errors });
          }
          notify.show(this.props.resetResponse.errors.globals, 'warning', 5000);
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
            email: '',
            errors: {},
          });
        }
      });
      Materialize.updateTextFields();
    });
  }

  render() {
    return (
      <ResetPasswordEmailModal
        close={this.handleClose} submit={this.handleFormSubmit}
        value={this.state.email}
        state={this.state} onChange={this.handleChange}
        email={this.state.email} error={this.state.errors.name}
        closeModalRoute={this.props.closeModalRoute}
      />

    );
  }
}

ResetPasswordEmailContainer.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  // eslint-disable-next-line
  resetResponse: PropTypes.object
};

const mapStateToProps = state => ({
  resetResponse: state.resetPasswordReducer,
});

const matchDispatchToProps = dispatch => bindActionCreators({ forgotPassword }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(ResetPasswordEmailContainer);
