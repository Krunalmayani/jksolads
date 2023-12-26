/** @format */

import React from 'react';
import PermissionContentBox from '../components/PermissionComponent/PermissionContentBox';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';

const Permission = () => {
  return (
    <>
      <Helmet>
        <title>Permissions</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <PermissionContentBox />
      </div>
    </>
  );
};

export default Permission;
