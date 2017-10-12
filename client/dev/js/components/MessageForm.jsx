import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

/**
 * Gives the presentational view for the messaging form text area
 * and the priority select dropdown
 * @param {object} props
 * @returns {void}
 */
const MessageForm = props => (
  <form className="col s12" onSubmit={props.onSubmit}>
    <div className="row text-area-row">
      <div className="input-field col s12 m2 left">
        <Select
          name={'choose priority'}
          value={props.state.selected}
          options={props.options}
          onChange={props.onLogChange}
          placeholder={'choose priority'}
          searchable={false}
        />
      </div>
      <div className="input-field col s12 m10 right">
        <textarea
          value={props.state.content} name="content" id="textarea1"
          onChange={props.onChange}
          placeholder="Enter a message here"
          className="materialize-textarea"
          onKeyPress={props.onKeyPress}
        />
      </div>
    </div>
  </form>
);

MessageForm.defaultProps = {
  state: {
    content: '',
    selected: { value: 'Normal', label: 'Normal' },
    errors: {},
  }
};

MessageForm.propTypes = {
  state: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  onLogChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired
};

export default MessageForm;
