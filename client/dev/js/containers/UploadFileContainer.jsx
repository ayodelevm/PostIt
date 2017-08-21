import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifications, { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createNewGroup } from '../actions/groupActions';
import { validateGroupInput } from '../utils/validations';
import UploadsModal from '../components/UploadsModal.jsx';

class GroupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile(files) {
    console.log('fileUploaded', files[0].name);
    const image = files[0];
  }


  render() {


    return (
      <UploadsModal
        onUploadFile={this.uploadFile}
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
  usersResponse: state.addUserReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ createNewGroup }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(GroupForm);
