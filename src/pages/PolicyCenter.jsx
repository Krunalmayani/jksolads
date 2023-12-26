/** @format */

import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';
import PolicyContentBox from '../components/PolicyComponents/PolicyContentBox';

const PolicyCenter = () => {
  return (
    <>
      <Helmet>
        <title>Policy Center</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <PolicyContentBox />
      </div>
    </>
  );
};

export default PolicyCenter;
