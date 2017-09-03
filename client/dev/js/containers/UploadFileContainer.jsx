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
import { uploadProfileImage, getAllUsers } from '../actions/addUserActions';
import { socketConnect } from '../actions/socketActions';

class UploadFileContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    this.uploadFile = this.uploadFile.bind(this);
    this.props.socketConnect();
  }

  uploadFile(files) {
    const token = window.localStorage.token;
    // const userId = props.userId;
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


  render() {
    return (
      <UploadsModal
        onUploadFile={this.uploadFile}
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
  // eslint-disable-next-line
  uploadResponse: PropTypes.object
};

const mapStateToProps = state => ({
  uploadResponse: state.addUserReducer
});

const matchDispatchToProps = dispatch => bindActionCreators({ uploadProfileImage, getAllGroups, getOneGroupWithMessages, getAllUsers, socketConnect }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(UploadFileContainer);
