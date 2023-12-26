/** @format */

import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import Profile from '../../assets/images/profile.png';

const PersonalContentBox = () => {
  const { sidebarActive } = useContext(DataContext);
  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='main-box-wrapper mt-5'>
        <div className='main-box-row info-box-wrap'>
          <div className='box-wrapper'>
            <div className='box'>
              <div className='title-box'>
                <div>User Profile</div>
              </div>
              <div className='content-box'>
                <div className='user-btn'>
                  <img src={Profile} alt='user' />
                </div>
              </div>
            </div>
            <div className='box'>
              <div className='title-box'>
                <div>Name</div>
              </div>
              <div className='content-box'>
                <p className=''>{localStorage.getItem('name')}</p>
              </div>
            </div>
            <div className='box'>
              <div className='title-box'>
                <div>Email</div>
              </div>
              <div className='content-box'>
                <p className=''>{localStorage.getItem('email')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalContentBox;
