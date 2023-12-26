/** @format */

import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';
import CronContentBox from '../components/CronComponents/CronContentBox';

const Cron = () => {
  return (
    <>
      <Helmet>
        <title>Cron</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <CronContentBox />
      </div>
    </>
  );
};

export default Cron;
