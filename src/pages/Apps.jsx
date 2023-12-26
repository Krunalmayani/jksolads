/** @format */

import React from 'react';
import AppContentBox from '../components/AppComponents/AppContentBox';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';

const Apps = () => {
  return (
    <>
      <Helmet>
        <title>All Apps</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <AppContentBox />
      </div>
    </>
  );
};

export default Apps;
