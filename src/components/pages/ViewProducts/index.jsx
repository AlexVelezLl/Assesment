import React from 'react';
import PrimaryButton from '../../uiKit/components/buttons/PrimaryButton';

const ViewProducts = () => {
  return (
    <section>
      <div className='bp-flx-btwn bp-mt-2'>
        <input className='bp-input' placeholder='Search' />
        <PrimaryButton linkTo='/create'>Create Product</PrimaryButton>
      </div>
    </section>
  );
};

export default ViewProducts;