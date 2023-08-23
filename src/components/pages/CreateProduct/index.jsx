import React, { useState } from 'react';

import {
  DateInput,
  TextInput,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton
} from '../../uiKit';

import './index.scss';
import { getNextYear, getToday, isUrlValid } from '../../../utils';
import Services from '../../../services';

const CreateProduct = () => {
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = ({ field, message, constraints = {}}) => {
    if (!product[field]) {
      errors[field] = message;
      setErrors({...errors});
      return false;
    }
    if (constraints.minLength && product[field].length < constraints.minLength) {
      errors[field] = message + ` (min ${constraints.minLength} caracteres)`;
      setErrors({ ...errors });
      return false;
    }
    if (constraints.maxLength && product[field].length > constraints.maxLength) {
      errors[field] = message + ` (max ${constraints.maxLength} caracteres)`;
      setErrors({ ...errors });
      return false;
    }
    if (constraints.future) {
      console.log("Aaaa", (
        !product[field] ||
        new Date(product[field]) < new Date(getToday())
      ));
    }
    if (
      constraints.future &&
      (
        !product[field] ||
        new Date(product[field]) < new Date(getToday())
      )
    ) {
      console.log("Me estoy metiendo aqui")
      errors[field] = message + ' Debe ingrear una fecha futura';
      setErrors({ ...errors });
      return false;
    }
    if (constraints.validUrl && !isUrlValid(product[field])) {
      errors[field] = message;
      setErrors({ ...errors });
      return false;
    }
    errors[field] = '';
    setErrors({ ...errors });
    return true;
  };

  const validateID = () => validateField({
    field:'id',
    message: '¡ID no válido!',
    constraints: { minLength: 3, maxLength: 10 }
  });
  const validateName = () => validateField({
    field:'name',
    message: '¡Nombre no válido!',
    constraints: { minLength: 5, maxLength: 100 }
  });
  const validateDescription = () => validateField({
    field:'description',
    message: '¡Descripción no válida!',
    constraints: { minLength: 10, maxLength: 200 }
  });
  const validateLogo = () => validateField({
    field:'logo',
    message: '¡Url invalida!',
    constraints: { validUrl: true }
  });
  const validateReleaseDate = () => validateField({
    field: 'releaseDate',
    message: '¡Fecha inválida!',
    constraints: { future: true }
  });

  const validateForm = () => {
    return (
      validateID() |
      validateName() |
      validateDescription() |
      validateLogo() |
      validateReleaseDate()
    );
  };
  const handleReset = (e) => {
    e.preventDefault();
    setProduct({});
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const sdk = new Services();
      setLoading(true);
      await sdk.createProduct(product);
      handleReset(e);
      alert('Producto creado con éxito');
    } catch (error) {
      console.log("Error on create product", error);
      alert('Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = () => {
    return Object.values(errors).some(Boolean) || loading;
  };
  const isResetDisabled = () => {
    return (
      (
        !Object.values(product).some(Boolean) &&
        !Object.values(errors).some(Boolean)
      ) ||
      loading
    );
  };

  return (
    <section className='bp-w-50 bp-mh-auto bp-mt-3'>
      <h1 className='bp-txt-center'>
        Formulario de Registro
      </h1>
      <hr/>
      <form className='bp-m-1'>
        <div className='bp-register-form'>
          <TextInput
            label='ID'
            name='productId'
            placeholder='ID del producto'
            error={errors.id}
            value={product.id}
            onChange={value => setProduct({ ...product, id: value })}
            onBlur={validateID}
          />
          <TextInput
            label='Nombre'
            name='productName'
            placeholder='Nombre del producto'
            error={errors.name}
            value={product.name}
            onChange={value => setProduct({ ...product, name: value })}
            onBlur={validateName}
          />
          <TextInput
            label='Descripción'
            name='productDescription'
            placeholder='Descripción del producto'
            error={errors.description}
            value={product.description}
            onChange={value => setProduct({ ...product, description: value })}
            onBlur={validateDescription}
          />
          <TextInput
            label='Logo'
            name='productLogo'
            placeholder='Url del logo del producto'
            error={errors.logo}
            value={product.logo}
            onChange={value => setProduct({ ...product, logo: value })}
            onBlur={validateLogo}
          />
          <DateInput
            label='Fecha Liberación'
            name='productReleaseDate'
            placeholder='Fecha de liberación del producto'
            error={errors.releaseDate}
            value={product.releaseDate}
            onChange={value => setProduct({
              ...product,
              releaseDate: value,
              revisionDate: getNextYear(value)
            })}
            onBlur={validateReleaseDate}
          />
          <DateInput
            disabled
            label='Fecha Revisión'
            name='productReleaseDate'
            placeholder='Fecha de revisión del producto'
            value={product.revisionDate}
          />
        </div>
        <div className='bp-flx-hc bp-mt-2'>
          <TertiaryButton
            linkTo='/'
          >
            Volver
          </TertiaryButton>
          <SecondaryButton
            onClick={handleReset}
            disabled={isResetDisabled()}
          >
            Reiniciar
          </SecondaryButton>
          <PrimaryButton
            onClick={handleSubmit}
            disabled={isSubmitDisabled()}
          >
            Registrar
          </PrimaryButton>
        </div>
      </form>
    </section>
  );
};

export default CreateProduct;
