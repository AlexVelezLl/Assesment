// root de todo, rutas, context.
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Header';
import ViewProducts from './pages/ViewProducts';
import CreateProduct from './pages/CreateProduct';

import './uiKit/index.scss';

const App = ({ basePath }) => {

  return (
    <div className='bp-p-3'>
      <Header />
      <BrowserRouter basename={basePath}>
        <Routes>
          <Route path="/" element={<ViewProducts />}/>
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
