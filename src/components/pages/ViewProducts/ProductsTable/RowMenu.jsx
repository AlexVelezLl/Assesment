import React from "react";

const RowMenu = ({ onDelete }) => {
  return (
    <ul className="bp-menu">
      <li
        onClick={onDelete}
      >
        Delete
      </li>
    </ul>
  )
};

export default RowMenu;
