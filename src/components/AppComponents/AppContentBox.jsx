/** @format */

import React, { useContext, useEffect, useRef, useState } from 'react';
import useAppsApi from '../../hooks/useAppsApi';
import Footer from '../Footer';
import { MdOutlineContentCopy } from 'react-icons/md';
import Spinner from 'react-bootstrap/Spinner';
import DataTable from 'react-data-table-component';
import useGeneratePagination from '../../hooks/useGeneratePagination';
import CustomLoadingIndicator from '../DataTableComponents/CustomLoadingIndicator';
import CustomNoDataComponent from '../DataTableComponents/CustomNoDataComponent';
import CustomPaginationComponent from '../CustomPaginationComponent';
import { DataContext } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { ReactComponent as TableSortArrow } from '../../assets/images/arrow-dwon.svg';

const AppContentBox = () => {
  const { setAddAppFlag, addAppFlag, sidebarActive } = useContext(DataContext);

  const [appList, setAppList] = useState([]);
  const [appPageNumber, setAppPageNumber] = useState(1);
  const [appPageLength, setAppPageLength] = useState(10);
  const [appTotalPages, setAppTotalPages] = useState('');
  const [appPaginationList, setAppPaginationList] = useState([]);
  const [appOrder, setAppOrder] = useState('');
  const [appColumnName, setAppColumnName] = useState('');

  const formData = new FormData();
  formData.append('user_id', localStorage.getItem('id'));
  formData.append('user_token', localStorage.getItem('token'));
  formData.append('start', appPageLength * (appPageNumber - 1));
  formData.append('length', appPageLength);
  formData.append('iSortCol_0', appColumnName);
  if (appOrder.length > 0) {
    formData.append('sSortDir_0', appOrder);
  }

  //Sort Function
  const customSort = (column, sortDirection) => {
    setAppColumnName(column.id - 2);
    setAppOrder(sortDirection.toUpperCase());
    setAddAppFlag(!addAppFlag);
  };

  const fetchData = async () => {
    try {
      const response = await useAppsApi('apps-list', formData);
      setAppList(response);
      setAppTotalPages(response?.iTotalDisplayRecords / appPageLength);
    } catch (error) {
      throw new Error(error);
    }
  };

  // Handle Page Change
  const handlePageChange = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [addAppFlag, appPageNumber]);

  useEffect(() => {
    const paginationLinks = useGeneratePagination(appTotalPages);
    setAppPaginationList(paginationLinks);
  }, [appTotalPages]);

  const columns = [
    {
      name: 'Id',
      selector: (row) => row['increment_id'],
      cell: (app) => <span>{app?.increment_id}</span>,
      sortable: false,
      width: '70px',
    },
    {
      name: 'App',
      selector: (row) => row['app_display_name'],
      cell: (app) => (
        <Link
          to={'/app-details/' + app?.app_auto_id}
          className='app-item'
          onClick={() => localStorage.setItem('app_auto_id', app?.app_auto_id)}
        >
          <div className='app-img'>
            <img
              alt=''
              aria-hidden='true'
              className='app-icon'
              src={app.app_icon}
            />
          </div>
          <div className='label-container'>
            <span className='primary-label'>{app.app_display_name}</span>
            <span className='secondary-label'>
              {(app?.app_platform == '1' && 'IOS') ||
                (app?.app_platform == '2' && 'Android')}
            </span>
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      name: 'App ID',
      selector: (row) => row['app_admob_app_id'],
      cell: (app) => (
        <div
          className='copy-text'
          onClick={() => handleCopyText(app?.app_admob_app_id)}
        >
          <div className='copy'>
            <button
              className='copy-btn'
              data-toggle='tooltip'
              data-placement='bottom'
            >
              <MdOutlineContentCopy className='material-icons' />
              <span
                className='text'
                dangerouslySetInnerHTML={{
                  __html: app?.app_admob_app_id,
                }}
              ></span>
            </button>
            {app?.app_admob_app_id == copyMessage && (
              <div className='copyMessage'> Copied </div>
            )}
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Approval status',
      selector: (row) => row['app_approval_state'],
      cell: (app) => (
        <div
          className='getting-item'
          dangerouslySetInnerHTML={{
            __html: app?.app_approval_state,
          }}
        ></div>
      ),
      sortable: true,
    },
    {
      name: 'Shops',
      selector: (row) => row['app_platform'],
      cell: (app) => (
        <>
          {app.app_platform == 2 ? (
            <div>Google Play</div>
          ) : (
            <div>App Store</div>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: 'Package name or store ID',
      selector: (row) => row['app_store_id'],
      cell: (app) => (
        <span
          className='text'
          title='com.aiartimage.aichat.aibysoftai'
          data-toggle='tooltip'
          data-placement='bottom'
        >
          {app?.app_store_id}
        </span>
      ),
      width: '400px',
      sortable: true,
    },
    {
      name: 'Ad units',
      selector: (row) => row['total_ad_units'],
      cell: (app) => (
        <span className='app-units'>
          {(app?.total_ad_units).split(' ')[0]} active
        </span>
      ),
      sortable: true,
    },
  ];

  //Copy text
  const [copyMessage, setCopyMessage] = useState('');
  const handleCopyText = async (id) => {
    const spanRegex = /<span[^>]*>([^<]+)<\/span>/;
    const match = id.match(spanRegex);
    if (match && match.length > 1) {
      const finalId = match[1];
      try {
        await navigator.clipboard.writeText(finalId);
        setCopyMessage(id);
        setTimeout(() => {
          setCopyMessage(null);
        }, 1500);
      } catch (err) {
        throw new Error(err);
      }
    }
  };

  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='table-box-wrap main-box-wrapper pdglr24'>
        <div className='userBoxWrap user-section-wrapper'>
          <div className='button-top-wrap'>
            <h1 className='title'>Apps</h1>
          </div>

          {appList?.aaData?.length === undefined ? (
            <div className='shimmer-spinner'>
              <Spinner animation='border' variant='secondary' />
            </div>
          ) : (
            <>
              <div className='table-container ad-units-box user-table-box'>
                <DataTable
                  columns={columns}
                  data={appList?.aaData}
                  pagination
                  paginationPerPage={10}
                  paginationServer
                  progressPending={false}
                  onChangePage={handlePageChange}
                  paginationComponent={() => (
                    <CustomPaginationComponent
                      pageNumber={appPageNumber}
                      paginationList={appPaginationList}
                      setPageNumber={setAppPageNumber}
                    />
                  )}
                  progressComponent={<CustomLoadingIndicator />}
                  noDataComponent={<CustomNoDataComponent />}
                  onSort={customSort}
                  sortServer
                  sortIcon={<TableSortArrow />}
                />
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AppContentBox;
