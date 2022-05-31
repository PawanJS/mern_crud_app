import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ children, handleChange, label, id, ...otherProps }) => (
  <div className="group">
    {label ? (
      <label className="form-input-label" htmlFor={id}>
        {label}
      </label>
    ) : null}
    <input
      className="form-input"
      id={id}
      onChange={handleChange}
      {...otherProps}
    />
    {children}
  </div>
);

export default FormInput;
