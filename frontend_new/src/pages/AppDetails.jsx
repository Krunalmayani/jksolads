/** @format */

import React from 'react';
import AppDetailsContentBox from '../components/AppDetails/AppDetailsContentBox';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';
import AppSettingsContentBox from '../components/AppSettings/AppSettingsContentBox';
import AppUnitsContentBox from '../components/AdUnitsComponents/AdUnitsContentBox';
import { useState } from 'react';

const AppDetails = () => {
  const [appTab, setAppTab] = useState({
    detailsPage: true,
    settingPage: false,
    unitPage: false,
  });
  return (
    <>
      <Helmet>
        <title>App Details</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar appTab={appTab} setAppTab={setAppTab} />
        {appTab.detailsPage && <AppDetailsContentBox />}
        {appTab.settingPage && <AppSettingsContentBox />}
        {appTab.unitPage && <AppUnitsContentBox />}
      </div>
    </>
  );
};

export default AppDetails;
