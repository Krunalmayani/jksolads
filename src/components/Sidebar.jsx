/** @format */

import React, { useContext, useEffect, useState } from 'react';
import {
  MdHome,
  MdApps,
  MdPerson,
  MdAssessment,
  MdAdminPanelSettings,
  MdOutlineSpeed,
  MdOutlineSmartphone,
  MdSettingsApplications,
  MdOutlineLockPerson,
  MdPolicy,
} from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import useAppsApi from '../hooks/useAppsApi';
import { IoTimer } from 'react-icons/io5';

const Sidebar = ({ setAppTab, appTab }) => {
  // Sidebar All Apps
  const { sidebarActive, role } = useContext(DataContext);
  const [sidebarApp, setSidebarApp] = useState([]);
  const [sidebarSelectApp, setSidebarSelectApp] = useState([]);
  const appFormData = new FormData();
  appFormData.append('user_id', localStorage.getItem('id'));
  appFormData.append('user_token', localStorage.getItem('token'));
  const fetchData = async () => {
    try {
      const response = await useAppsApi('apps-list', appFormData);
      setSidebarApp(response?.aaData);
      setSidebarSelectApp(response?.aaData);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Selected App
  const [newSelectedApp, setNewSelectedApp] = useState('');
  const { id } = useParams();
  const sidebarFormData = new FormData();
  sidebarFormData.append('user_id', localStorage.getItem('id'));
  sidebarFormData.append('user_token', localStorage.getItem('token'));
  sidebarFormData.append('app_auto_id', id);
  const fetchSideBarData = async () => {
    try {
      const response = await useAppsApi('app-settings', sidebarFormData);
      setNewSelectedApp(response?.app_info);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    if (id !== undefined) fetchSideBarData();
  }, [id]);

  const [appOrderFlag, setAppOrderFlag] = useState(false);
  const app_id = localStorage.getItem('app_auto_id');

  useEffect(() => {
    if (sidebarApp.length > 0) {
      const index = sidebarApp.findIndex((obj) => obj?.app_auto_id == app_id);
      if (index !== -1) {
        const clickedObject = sidebarApp.splice(index, 1)[0];
        sidebarApp.unshift(clickedObject);
      }
      setSidebarSelectApp(sidebarApp);
    }
  }, [app_id, appOrderFlag, sidebarApp]);
  useEffect(() => {
    if (window.location.pathname.includes('/')) {
      setAppOrderFlag(!appOrderFlag);
    }
  }, [sidebarApp]);

  return (
    <div className={`sidebar-wrap ${sidebarActive ? 'open-menu' : ''}`}>
      <div className='sidebar-menu'>
        <div className='sidebar-open'>
          <div className='menu-box'>
            <Link
              to='/'
              className={
                window.location.pathname == '/'
                  ? 'section-menu active'
                  : 'section-menu'
              }
            >
              <MdHome className='sidebar_icon' />
              <span className='menu-item-label'>Home</span>
            </Link>
            <div className='menu-popup-box'>
              <div
                className={
                  window.location.pathname == '/apps'
                    ? 'section-menu active with-submenu'
                    : 'section-menu with-submenu'
                }
              >
                <MdApps className='sidebar_icon active' />
                <span className='menu-item-label'>Apps</span>
              </div>
              <div className='popup-wrapper apps-popup'>
                {sidebarSelectApp.length === 0 ? (
                  <div className='app-list no-data-found'>
                    <div className='app-item'>
                      <div className='label-container'>
                        <span className='primary-label'>No App Found</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  sidebarSelectApp?.slice(0, 5)?.map((app) => (
                    <Link
                      to={'/app-details/' + app?.app_auto_id}
                      className='app-list'
                      key={app?.increment_id}
                      onClick={() =>
                        localStorage.setItem('app_auto_id', app?.app_auto_id)
                      }
                    >
                      <div className='app-item'>
                        <div className='app-img'>
                          <img
                            alt=''
                            aria-hidden='true'
                            className='app-icon'
                            leading=''
                            src={app?.app_icon}
                          />
                        </div>
                        <div className='label-container'>
                          <span className='primary-label'>
                            {app?.app_display_name}
                          </span>
                          <div className='secondary-label'>
                            {(app?.app_platform == '1' && 'IOS') ||
                              (app?.app_platform == '2' && 'Android')}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
                {sidebarApp.length > 0 && (
                  <div className='popup-footer'>
                    <div className='app-picker-footer'>
                      {/* <Link to='/apps' className='d-content-btn view-all-app'>
                        Add App
                      </Link> */}
                      <Link to='/apps' className='d-content-btn view-all-app'>
                        View all apps
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              {newSelectedApp && (
                <div className='sub-menu-box'>
                  <div className='app-item'>
                    <div className='app-img'>
                      <img
                        aria-hidden='true'
                        className='app-icon mCS_img_loaded'
                        leading=''
                        src={newSelectedApp?.app_icon}
                      />
                    </div>
                    <div className='label-container'>
                      <span className='primary-label'>
                        {newSelectedApp?.app_display_name}
                      </span>
                      <div className='secondary-label'>
                        {(newSelectedApp?.app_platform == '1' && 'IOS') ||
                          (newSelectedApp?.app_platform == '2' && 'Android')}
                      </div>
                    </div>
                  </div>
                  <Link
                    onClick={() => {
                      setAppTab({
                        detailsPage: true,
                        settingPage: false,
                        unitPage: false,
                      });
                    }}
                    className={
                      appTab.detailsPage
                        ? 'section-menu active'
                        : 'section-menu'
                    }
                  >
                    <MdOutlineSpeed className='material-icons' />
                    <span className='menu-item-label'>App overview</span>
                  </Link>
                  <Link
                    onClick={() => {
                      setAppTab({
                        detailsPage: false,
                        settingPage: false,
                        unitPage: true,
                      });
                    }}
                    className={
                      appTab.unitPage ? 'section-menu active' : 'section-menu'
                    }
                  >
                    <MdOutlineSmartphone className='material-icons' />
                    <span className='menu-item-label'>Ad units</span>
                  </Link>
                  <Link
                    onClick={() => {
                      setAppTab({
                        detailsPage: false,
                        settingPage: true,
                        unitPage: false,
                      });
                    }}
                    className={
                      appTab.settingPage
                        ? 'section-menu active'
                        : 'section-menu'
                    }
                  >
                    <MdSettingsApplications className='material-icons' />
                    <span className='menu-item-label'>App settings</span>
                  </Link>
                </div>
              )}
            </div>
            <Link
              to='/reports'
              className={
                window.location.pathname == '/reports'
                  ? 'section-menu active'
                  : 'section-menu'
              }
            >
              <MdAssessment className='sidebar_icon' />
              <span className='menu-item-label'>Reports</span>
            </Link>
            {/* <Link
              to='/accounts'
              className={
                window.location.pathname == '/accounts'
                  ? 'section-menu active'
                  : 'section-menu'
              }
            >
              <MdAdminPanelSettings className='sidebar_icon' />
              <span className='menu-item-label'>Accounts</span>
            </Link>
            {role == 1 && (
              <Link
                to='/users'
                className={
                  window.location.pathname == '/users'
                    ? 'section-menu active'
                    : 'section-menu'
                }
              >
                <MdPerson className='sidebar_icon' />
                <span className='menu-item-label'>Users</span>
              </Link>
            )}
            {role == 1 && (
              <Link
                to='/permission'
                className={
                  window.location.pathname == '/permission'
                    ? 'section-menu active'
                    : 'section-menu'
                }
              >
                <MdOutlineLockPerson className='sidebar_icon' />
                <span className='menu-item-label'>Permission</span>
              </Link>
            )} */}

            <div className='section-container'>
              {/* <Link
                to='/policy-center'
                className={
                  window.location.pathname == '/policy-center'
                    ? 'section-menu active'
                    : 'section-menu'
                }
              >
                <MdPolicy className='sidebar_icon' />
                <span className='menu-item-label'>Policy Center</span>
              </Link> */}
              <Link
                to='/settings'
                className={
                  window.location.pathname == '/settings'
                    ? 'section-menu active'
                    : 'section-menu'
                }
              >
                <MdSettingsApplications className='sidebar_icon' />
                <span className='menu-item-label'>Settings</span>
              </Link>
            </div>
            {/* {role == 1 && (
              <Link
                to='/cron'
                className={
                  window.location.pathname == '/cron'
                    ? 'section-menu active'
                    : 'section-menu'
                }
              >
                <IoTimer className='sidebar_icon' />
                <span className='menu-item-label'>Cron</span>
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
