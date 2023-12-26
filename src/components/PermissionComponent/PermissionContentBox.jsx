/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import Footer from '../Footer';
import Spinner from 'react-bootstrap/Spinner';
import useGeneratePagination from '../../hooks/useGeneratePagination';
import CustomPaginationComponent from '../CustomPaginationComponent';
import CustomLoadingIndicator from '../DataTableComponents/CustomLoadingIndicator';
import CustomNoDataComponent from '../DataTableComponents/CustomNoDataComponent';
import DataTable from 'react-data-table-component';
import AddPermissionModal from './AddPermissionModal';
import useApi from '../../hooks/useApi';
import { MdAdd } from 'react-icons/md';
import UnitListModal from './UnitListModal';
import { ReactComponent as TableSortArrow } from '../../assets/images/arrow-dwon.svg';

const PermissionContentBox = () => {
  const {
    addPermissionFlag,
    setAddPermissionFlag,
    sidebarActive,
    modalShow,
    setModalShow,
  } = useContext(DataContext);

  const [permissionAppList, setPermissionAppList] = useState([]);
  const [permissionPageNumber, setPermissionPageNumber] = useState(1);
  const [permissionPageLength, setPermissionPageLength] = useState(10);
  const [permissionTotalPages, setPermissionTotalPages] = useState('');
  const [permissionPaginationList, setPermissionPaginationList] = useState([]);
  const [permissionOrder, setPermissionOrder] = useState('');
  const [permissionColumnName, setPermissionColumnName] = useState('');
  const [unitModal, setUnitModal] = useState(false);

  const formData = new FormData();
  formData.append('user_id', localStorage.getItem('id'));
  formData.append('user_token', localStorage.getItem('token'));
  formData.append('start', permissionPageLength * (permissionPageNumber - 1));
  formData.append('length', permissionPageLength);
  formData.append('iSortCol_0', permissionColumnName);
  if (permissionOrder.length > 0) {
    formData.append('sSortDir_0', permissionOrder);
  }

  //Sort Function
  const customSort = (column, sortDirection) => {
    setPermissionColumnName(column.id - 2);
    setPermissionOrder(sortDirection.toUpperCase());
    setAddPermissionFlag(!addPermissionFlag);
  };

  const fetchData = async () => {
    try {
      const response = await useApi('permission-apps-list', formData);
      setPermissionAppList(response?.data?.aaData);
      setPermissionTotalPages(
        response?.data?.iTotalDisplayRecords / permissionPageLength
      );
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
  }, [addPermissionFlag, permissionPageNumber]);

  useEffect(() => {
    const paginationLinks = useGeneratePagination(permissionTotalPages);
    setPermissionPaginationList(paginationLinks);
  }, [permissionTotalPages]);

  const columns = [
    {
      name: 'Id',
      selector: (row) => row['increment_id'],
      sortable: false,
      width: '70px',
    },
    {
      name: 'User Name',
      selector: (row) => row['user_name'],
      sortable: true,
    },
    {
      name: 'App Name',
      selector: (row) => row['app_display_name'],
      cell: (app) => (
        <div className='app-item-box'>
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
            <span className='primary-label'>{app?.app_display_name}</span>
            <span className='secondary-label'>{app?.app_store_id}</span>
          </div>
        </div>
      ),
      sortable: true,
      width: '600px',
    },
    {
      name: 'App Id',
      selector: (row) => row['app_admob_app_id'],
      sortable: true,
      width: '500px',
    },
    {
      name: 'Approval status',
      selector: (row) => row['app_approval_state'],
      cell: (app) => (
        <div className='getting-item'>
          <span dangerouslySetInnerHTML={{ __html: app.app_approval_state }} />
        </div>
      ),
      sortable: false,
    },
    {
      name: 'Ad Units',
      selector: (row) => row['total_ad_units'],
      cell: (appId) => (
        <div>
          <span>{appId?.total_ad_units}</span>
          <MdAdd
            className='plus-icon'
            onClick={() =>
              handleUnitModal(appId?.increment_id, appId?.user_unique_id)
            }
          />
        </div>
      ),
      sortable: false,
    },
  ];
  const [selectedID, setSelectedId] = useState('');
  const [userUniqueID, setUserUniqueId] = useState('');

  const handleUnitModal = (increment_id, user_unique_id) => {
    setSelectedId(increment_id);
    setUserUniqueId(user_unique_id);
    setUnitModal(true);
  };

  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='table-box-wrap main-box-wrapper pdglr24'>
        <div className='userBoxWrap user-section-wrapper'>
          <div className='button-top-wrap'>
            <h1 className='title'>Permission</h1>
            <div
              className='d-content-btn float-right text-transform body-font-btn ml-0'
              onClick={() => setModalShow(true)}
            >
              Add Permission
            </div>
          </div>
          {permissionAppList?.length === 0 ? (
            <div className='shimmer-spinner'>
              <Spinner animation='border' variant='secondary' />
            </div>
          ) : (
            <>
              <div className='table-container ad-units-box permission-table-box'>
                <DataTable
                  columns={columns}
                  data={permissionAppList}
                  pagination
                  paginationPerPage={10}
                  paginationServer
                  progressPending={false}
                  onChangePage={handlePageChange}
                  paginationComponent={() => (
                    <CustomPaginationComponent
                      pageNumber={permissionPageNumber}
                      paginationList={permissionPaginationList}
                      setPageNumber={setPermissionPageNumber}
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
      <AddPermissionModal show={modalShow} onHide={() => setModalShow(false)} />

      {permissionAppList.length > 0 && (
        <UnitListModal
          show={unitModal}
          onHide={() => setUnitModal(false)}
          data={permissionAppList}
          id={selectedID}
          userid={userUniqueID}
        />
      )}
    </div>
  );
};

export default PermissionContentBox;
