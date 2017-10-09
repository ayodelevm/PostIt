import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * A reusable component for input fields
 * @param {object} props - destructured
 * @returns {void}
 */
const InputFieldGroup = ({
  placeholder, htmlFor, id, name, value, label, error, type, onChange
}) => (
  <div>
    <div className="input-field name-desc col s12">
      <input
        className={classnames({ 'has-error': !!error })}
        placeholder={placeholder} id={id} type={type}
        name={name} onChange={onChange} value={value}
      />
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  </div>
);

InputFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line  
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  htmlFor: PropTypes.string.isRequired,
};

InputFieldGroup.defaultProps = {
  type: 'text'
};

export default InputFieldGroup;
