import React from 'react';

const InputContainer = (props) => {
  const { children, disabled, label, name, error } = props;

  return (
    <div
      className={
        `bp-input-container ${error ? 'bp-error' : ''} ${disabled ? 'bp-disabled' : ''}`}
    >
      <label htmlFor={name}>
        { label }
      </label>

      { children }

      {
        error &&
        <span className='bp-error-message'>
          { error }
        </span>
      }
    </div>
  );
};

export default InputContainer;
