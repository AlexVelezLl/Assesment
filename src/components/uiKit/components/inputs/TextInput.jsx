import React from 'react';

import InputContainer from './InputContainer';

const TextInput = (props) => {
  const {
    label, name, error, value, onChange, disabled, ...rest
  } = props;

  return (
    <InputContainer
      name={name}
      label={label}
      error={error}
      disabled={disabled}
    >
      <input
        id={name}
        name={name}
        type='text'
        className='bp-input'
        disabled={disabled}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        {...rest}
      />
    </InputContainer>
  );
};

export default TextInput;
