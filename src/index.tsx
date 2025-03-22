import React from 'react';
import ReactDOM from 'react-dom/client';
import './Calculator.css';
import Calculator from './Calculator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
); 