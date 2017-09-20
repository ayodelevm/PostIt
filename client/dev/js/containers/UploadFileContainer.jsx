import React from 'react';
import superagent from 'superagent';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from 'react-notify-toast';
import sha1 from 'sha1';
import { getAllGroups } from '../actions/groupActions';
import { getOneGroupWithMessages } from '../actions/messageActions';
import UploadsModal from '../components/UploadsModal.jsx';
import { uploadProfileImage, getAllUsers } from '../actions/userActions';
import { socketConnect } from '../actions/socketActions';

/**
 * This class is the container component handling user's profile picture upload
 * It is responsible for managing all the state changes in the component
 */
class UploadFileContainer extends React.Component {
  /**
   * Initializes the state and binds this to the methods in this class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleUploadFile = this.handleUploadFile.bind(this);
    props.socketConnect();
  }

  /**
   * Handles uploadig a users profile image to cloudinary, saving the returned
   * link to database and handles response accordingly
   * @param {array} files
   * @returns {void}
   */
  handleUploadFile(files) {
    const token = window.localStorage.token;
    const image = files[0];

    const cloudName = 'dr6ynr4o0';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const timestamp = Date.now() / 1000;
    const uploadPreset = 'cg0ikqnk';

    const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}bvmxbowzriK0XoPK4X_ZBC-6YaQ`;

    const signature = sha1(paramsStr);
    const params = {
      api_key: '335675768189937',
      timestamp,
      upload_preset: uploadPreset,
      signature
    };


    const uploadReq = superagent.post(url);
    uploadReq.attach('file', image);

    Object.keys(params).forEach((key) => {
      uploadReq.field(key, params[key]);
    });

    uploadReq.end((err, resp) => {
      if (err) {
        notify.show('Uploads Failed!', 'warning', 5000);
        $('#user-new').modal('close');
        return;
      }
      const newImage = { profileImage: JSON.stringify(resp.body.secure_url) };
      this.props.uploadProfileImage(token, newImage, this.props.userId)
      .then(() => {
        if (this.props.uploadResponse.uploadSuccess) {
          notify.show('Upload Successful!', 'success', 5000);
          this.props.getAllGroups(token)
          .then(() => {
            if (this.props.groupId !== undefined) {
              return this.props.getOneGroupWithMessages(token, this.props.groupId)
                .then(() => this.props.getAllUsers(token));
            }
          });
          $('#user-new').modal('close');
        } else {
          notify.show('Uploads Failed!', 'warning', 5000);
          $('#user-new').modal('close');
        }
      });
    });
  }

  /**
   * @returns {jsx} - an xml/html -like syntax extension to javascript
   */
  render() {
    return (
      <UploadsModal
        onUploadFile={this.handleUploadFile}
        closeModalRoute={this.props.closeModalRoute}
      />

    );
  }
}

UploadFileContainer.propTypes = {
  getAllGroups: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  getOneGroupWithMessages: PropTypes.func.isRequired,
  uploadResponse: PropTypes.object,
  socketConnect: PropTypes.func.isRequired,
  closeModalRoute: PropTypes.string.isRequired,
  groupId: PropTypes.number,
  userId: PropTypes.number
};

const mapStateToProps = state => ({
  uploadResponse: state.userReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({
  uploadProfileImage,
  getAllGroups,
  getOneGroupWithMessages,
  getAllUsers,
  socketConnect }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(UploadFileContainer);
