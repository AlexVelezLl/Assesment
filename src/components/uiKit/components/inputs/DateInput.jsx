import React from 'react';

import InputContainer from './InputContainer';

const DateInput = (props) => {
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
        type='date'
        name={name}
        className='bp-input'
        disabled={disabled}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        {...rest}
      />
    </InputContainer>
  );
};

export default DateInput;
