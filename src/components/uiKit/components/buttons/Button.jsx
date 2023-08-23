import React from 'react';
import { Link } from "react-router-dom";

const Button = (props) => {
  const { children, disabled, onClick, className, linkTo } = props;

  const button = (
    <button
      disabled={disabled}
      className={`bp-btn ${ className || "" } ${
        disabled ? 'bp-disabled' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  if (linkTo) {
    return (
      <Link to={linkTo}>
        { button }
      </Link>
    );
  }

  return button;
};

export default Button;
