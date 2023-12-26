/** @format */

import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import UserContentBox from '../components/UserComponents/UserContentBox';
import { Helmet } from 'react-helmet-async';

const User = () => {
  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <UserContentBox />
      </div>
    </>
  );
};

export default User;
