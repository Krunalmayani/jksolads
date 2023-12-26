/** @format */

import React from 'react';
import AccountContentBox from '../components/AccountComponents/AccountContentBox';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';

const Accounts = () => {
  return (
    <>
      <Helmet>
        <title>Accounts</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <AccountContentBox />
      </div>
    </>
  );
};

export default Accounts;
