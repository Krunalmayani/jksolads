/** @format */

import React, { useContext, useEffect, useRef, useState } from 'react';
import Profile from '../assets/images/profile.png';
import { MdMenu, MdNotifications } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import useUserApi from '../hooks/useUserApi';
import { ToastContainer, toast } from 'react-toastify';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userRef = useRef(null);
  const { sidebarActive, setSidebarActive, userId, userToken } =
    useContext(DataContext);
  //Click Function
  const handleClickOutside = (e) => {
    if (userRef.current && !userRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    const logoutData = new FormData();
    logoutData.append('user_id', localStorage.getItem('id'));
    logoutData.append('user_token', localStorage.getItem('token'));
    const response = await useUserApi('web-logout', logoutData);
    toast.error(response?.msg);
    localStorage.clear();
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className='app-bar-menu'>
      <div className='logo-menu-box'>
        <div
          className='menu-btn'
          onClick={() => setSidebarActive(!sidebarActive)}
        >
          <MdMenu className='menu_icon' />
        </div>
        <Link to='/' className='logo-box'></Link>
      </div>
      {/* <div className='custom-search-filter topBar-search'>
        <input
          type='search'
          placeholder='Search for app name or ad unit here'
        />
      </div> */}
      <div className='notification-user-box'>
        <div
          onClick={() => setIsOpen(!isOpen)}
          ref={userRef}
          className={`user-btn ${isOpen ? 'profile-open' : ''}`}
        >
          <img src={Profile} alt='user' />
          <div className='profile-box'>
            <div className='button-box'>
              <div className='img-box'>
                <img src={Profile} alt='user' />
              </div>
              <div className='text-box'>
                <h2>{localStorage.getItem('name')}</h2>
                <p>{localStorage.getItem('email')}</p>
              </div>
            </div>
            <div className='popup-footer'>
              <div onClick={handleSignOut} href='' className='sign-btn'>
                Sign out
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position='top-right' autoClose={5000} theme='light' />
      </div>
    </div>
  );
};

export default TopBar;
