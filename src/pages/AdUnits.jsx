/** @format */

import React from 'react';
import AppUnitsContentBox from '../components/AdUnitsComponents/AdUnitsContentBox';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';

const AdUnits = () => {
  return (
    <>
      <Helmet>
        <title>Ad Units</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <AppUnitsContentBox />
      </div>
    </>
  );
};

export default AdUnits;
