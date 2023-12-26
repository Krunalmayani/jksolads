/** @format */

import React from 'react';
import ReportContentBox from '../components/ReportComponents/ReportContentBox';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';

const Reports = () => {
  return (
    <>
      <Helmet>
        <title>Reports</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <ReportContentBox />
      </div>
    </>
  );
};

export default Reports;
