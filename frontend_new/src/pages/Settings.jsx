/** @format */

import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';
import SettingsContentBox from '../components/SettingsComponents/SettingsContentBox';

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <SettingsContentBox />
      </div>
    </>
  );
};

export default Settings;
