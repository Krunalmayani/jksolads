/** @format */

import React from 'react';
import AppSettingsContentBox from '../components/AppSettings/AppSettingsContentBox';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';

const AppSettings = () => {
  return (
    <>
      <Helmet>
        <title>App Settings</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <AppSettingsContentBox />
      </div>
    </>
  );
};

export default AppSettings;
