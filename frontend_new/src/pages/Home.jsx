/** @format */

import React from 'react';
import RightContentBox from '../components/HomeComponent/RightContentBox';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>JKSOL Ads</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <RightContentBox />
      </div>
    </>
  );
};

export default Home;
