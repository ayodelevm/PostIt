import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MessagingFormComponent = props => (
  <form className="col s12" onSubmit={props.submit}>
    <div className="row">
      <div className="input-field col s2 left">
        <Select
          name={'choose priority'}
          value={props.state.selected}
          options={props.options}
          onChange={props.logChange}
          placeholder={'choose priority'}
        />
      </div>
      <div className="input-field col s10 right">
        <textarea
          value={props.state.message} name="message" id="textarea1"
          onChange={props.onChange} placeholder="Enter a message here" className="materialize-textarea"
          onKeyPress={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              props.submit(event);
            }
          }}
        />
      </div>
    </div>
  </form>
);

MessagingFormComponent.defaultProps = {
  state: {
    priority: 'Normal',
    groupId: '',
    errors: {},
  }
};

MessagingFormComponent.propTypes = {
  //eslint-disable-next-line
  state: PropTypes.object,
  onChange: PropTypes.func
};

export default MessagingFormComponent;
