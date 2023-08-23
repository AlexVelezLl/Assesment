import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components';
import environment from './environment';

import './index.css';
import Services from './services';

// pre load services
const { apiUrl, authorId } = environment;
new Services(apiUrl, authorId);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
