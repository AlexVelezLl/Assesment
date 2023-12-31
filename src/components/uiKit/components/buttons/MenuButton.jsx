import React from "react";

const MenuButton = (props) => {
  return (
    <div
      className="bp-btn"
      onClick={props.onClick}
    >
      <svg
        width="3"
        height="15"
        viewBox="0 0 3 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
        <circle cx="1.5" cy="7.5" r="1.5" fill="#C4C4C4" />
        <circle cx="1.5" cy="13.5" r="1.5" fill="#C4C4C4" />
      </svg>
    </div>
  )
};

export default MenuButton;
