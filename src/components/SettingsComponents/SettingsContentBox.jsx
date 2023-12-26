/** @format */

import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import AccountContentBox from '../AccountComponents/AccountContentBox';
import Footer from '../Footer';
import PermissionContentBox from '../PermissionComponent/PermissionContentBox';
import UserContentBox from '../UserComponents/UserContentBox';
import PersonalContentBox from './PersonalContentBox';

const SettingsContentBox = () => {
  const { sidebarActive, role } = useContext(DataContext);

  const [tab, setTab] = useState({
    personalTab: true,
    accountTab: false,
    userTab: false,
    permissionTab: false,
  });

  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='table-box-wrap main-box-wrapper pdglr24'>
        <div className='userBoxWrap user-section-wrapper'>
          <div className='button-top-wrap'>
            <h1 className='title'>Settings</h1>
          </div>
          <div className='tab-container ad-units-box user-table-box'>
            <div className='tab-top-bar'>
              <div
                onClick={() => {
                  setTab({
                    personalTab: true,
                    accountTab: false,
                    userTab: false,
                    permissionTab: false,
                  });
                }}
                className={`tab-item ${tab.personalTab && 'tab-active'} `}
              >
                Personal
              </div>
              <div
                onClick={() => {
                  setTab({
                    personalTab: false,
                    accountTab: true,
                    userTab: false,
                    permissionTab: false,
                  });
                }}
                className={`tab-item ${tab.accountTab && 'tab-active'} `}
              >
                Account
              </div>
              {role == 1 && (
                <div
                  onClick={() => {
                    setTab({
                      personalTab: false,
                      accountTab: false,
                      userTab: true,
                      permissionTab: false,
                    });
                  }}
                  className={`tab-item ${tab.userTab && 'tab-active'}`}
                >
                  Users
                </div>
              )}
              {role == 1 && (
                <div
                  onClick={() => {
                    setTab({
                      personalTab: false,
                      accountTab: false,
                      userTab: false,
                      permissionTab: true,
                    });
                  }}
                  className={`tab-item ${tab.permissionTab && 'tab-active'}`}
                >
                  Permission
                </div>
              )}
            </div>
            <div className='tab-content'>
              {tab.personalTab && <PersonalContentBox />}
              {tab.accountTab && <AccountContentBox />}
              {tab.userTab && role == 1 && <UserContentBox />}
              {tab.permissionTab && role == 1 && <PermissionContentBox />}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SettingsContentBox;
