/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './style.css';
import './responsive.css';
import App from './App';
import DataContextProvider from './context/DataContext';
import ReportContextProvider from './context/ReportContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataContextProvider>
    <ReportContextProvider>
      <App />
    </ReportContextProvider>
  </DataContextProvider>
);
