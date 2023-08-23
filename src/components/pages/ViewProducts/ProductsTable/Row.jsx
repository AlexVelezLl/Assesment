import React, { useState } from "react";

import { MenuButton } from '../../../uiKit';

import "./Row.scss";
import RowMenu from "./RowMenu";

const Row = ({ product, onDelete }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <tr>
      <td className='bp-product-logo'>
        <img src={product.logo} alt={product.name} />
      </td>
      <td className='bp-product-name'>{product.name}</td>
      <td className='bp-product-description'>{product.description}</td>
      <td className='bp-product-release'>{product.releaseDate}</td>
      <td className='bp-product-revision'>{product.revisionDate}</td>
      <td className='bp-product-actions'>
        <MenuButton
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        />
      </td>
      {
        isOpenMenu &&
        <RowMenu
          onDelete={() => {
            onDelete();
            setIsOpenMenu(false);
          }}
        />
      }
    </tr>
  );
};

export default Row;
