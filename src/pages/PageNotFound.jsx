/** @format */

import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { DataContext } from '../context/DataContext';
import { Helmet } from 'react-helmet-async';

const PageNotFound = () => {
  const { sidebarActive } = useContext(DataContext);
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <TopBar />
      <div className='main-wrapper'>
        <Sidebar />
        <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
          <div className='table-box-wrap main-box-wrapper pdglr24 not-found-wrap'>
            <div className='userBoxWrap user-section-wrapper'>
              <div className='button-top-wrap'>
                <h1 className='title'>Page Not Found</h1>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
