/** @format */

import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import Footer from '../Footer';

const PolicyContentBox = () => {
  const { sidebarActive } = useContext(DataContext);

  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='table-box-wrap main-box-wrapper pdglr24'>
        <div className='userBoxWrap user-section-wrapper'>
          <div className='button-top-wrap'>
            <h1 className='title'>Policy Center</h1>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PolicyContentBox;
