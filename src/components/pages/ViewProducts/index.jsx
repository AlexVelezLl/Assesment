import React, { useEffect, useMemo, useState } from 'react';
import PrimaryButton from '../../uiKit/components/buttons/PrimaryButton';
import { TextInput } from '../../uiKit';

import './index.scss';
import Services from '../../../services';
import useFetch from '../../../hooks/useFetch';
import ProductsTable from './ProductsTable';

const ViewProducts = () => {
  const [searchText, setSearchText] = useState('');
  const sdk = new Services();
  const getProducts = sdk.getProducts.bind(sdk);
  const [ products, loading, error, fetch ] = useFetch(getProducts);

  useEffect(() => {
    fetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onDelete = async (id) => {
    try {
      await sdk.deleteProduct(id);
      fetch();
      alert('Producto eliminado correctamente');
    } catch (err) {
      alert('Ocurrió un error al eliminar el producto');
    }
  };

  const filteredProducts = useMemo(() => (
    products?.filter(product => (
      product.name.toLowerCase().includes(searchText.toLowerCase())
    )) || []
  ), [products, searchText]);

  return (
    <section className='bp-view-products'>
      <div className='bp-flx-btwn bp-mt-2'>
        <TextInput
          placeholder='Search'
          value={searchText}
          onChange={setSearchText}
        />
        <PrimaryButton linkTo='/create'>Agregar</PrimaryButton>
      </div>
      {
        !loading &&
        !error &&
        products?.length > 0 &&
        <>
          <ProductsTable
            products={filteredProducts}
            onDelete={onDelete}
          />
          <div className='bp-txt-14 bp-mt-2'>
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </div>
        </>
      }
    </section>
  );
};

export default ViewProducts;