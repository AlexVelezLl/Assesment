import React from 'react';
import Row from './Row';

const ProductsTable = (props) => {
  const { products, onDelete } = props;

  return (
    <table className='bp-table bp-products-table bp-mt-2'>
      <thead>
        <tr>
          <th className='bp-product-logo'>Logo</th>
          <th className='bp-product-name'>Nombre del producto</th>
          <th className='bp-product-description'>Descripción</th>
          <th className='bp-product-release'>Fecha de liberación</th>
          <th className='bp-product-revision'>Fecha de revisión</th>
          <th className='bp-product-actions'></th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product, index) => (
            <Row
              key={index}
              product={product}
              onDelete={() => onDelete(product.id)}
            />
          ))
        }
      </tbody>
    </table>
  );
};

export default ProductsTable;
