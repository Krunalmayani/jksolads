/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import AddUserModal from './AddUserModal';
import useUserApi from '../../hooks/useUserApi';
import UpdateUserModal from './UpdateUserModal';
import Footer from '../Footer';
import Spinner from 'react-bootstrap/Spinner';
import useGeneratePagination from '../../hooks/useGeneratePagination';
import CustomPaginationComponent from '../CustomPaginationComponent';
import CustomLoadingIndicator from '../DataTableComponents/CustomLoadingIndicator';
import CustomNoDataComponent from '../DataTableComponents/CustomNoDataComponent';
import DataTable from 'react-data-table-component';
import Profile from '../../assets/images/profile.png';
import { ReactComponent as TableSortArrow } from '../../assets/images/arrow-dwon.svg';

const UserContentBox = () => {
  const {
    addUserFlag,
    setAddUserFlag,
    sidebarActive,
    modalShow,
    setModalShow,
    updateModalShow,
    setUpdateModalShow,
    setEditUserData,
  } = useContext(DataContext);

  const [usersList, setUsersList] = useState([]);
  const [usersPageNumber, setUsersPageNumber] = useState(1);
  const [usersPageLength, setUsersPageLength] = useState(10);
  const [usersTotalPages, setUsersTotalPages] = useState('');
  const [usersPaginationList, setUsersPaginationList] = useState([]);
  const [usersOrder, setUsersOrder] = useState('');
  const [usersColumnName, setUsersColumnName] = useState('');

  const formData = new FormData();
  formData.append('user_id', localStorage.getItem('id'));
  formData.append('user_token', localStorage.getItem('token'));
  formData.append('start', usersPageLength * (usersPageNumber - 1));
  formData.append('length', usersPageLength);
  formData.append('iSortCol_0', usersColumnName);
  if (usersOrder.length > 0) {
    formData.append('sSortDir_0', usersOrder);
  }

  //Sort Function
  const customSort = (column, sortDirection) => {
    setUsersColumnName(column.id - 2);
    setUsersOrder(sortDirection.toUpperCase());
    setAddUserFlag(!addUserFlag);
  };

  const fetchData = async () => {
    try {
      const response = await useUserApi('user-list', formData);
      setUsersList(response);
      setUsersTotalPages(response?.iTotalDisplayRecords / usersPageLength);
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
  }, [addUserFlag, usersPageNumber]);

  useEffect(() => {
    const paginationLinks = useGeneratePagination(usersTotalPages);
    setUsersPaginationList(paginationLinks);
  }, [usersTotalPages]);

  const columns = [
    {
      name: 'Id',
      selector: (row) => row['increment_id'],
      sortable: false,
      width: '80px',
    },
    {
      name: 'Name',
      selector: (row) => row['user_name'],
      sortable: true,
      width: '300px',
      cell: (row) => (
        <>
          <div className='app-img'>
            <img src={Profile} alt='user' />
          </div>
          <div className='label-container'>
            <span className='primary-label'>{row.user_name}</span>
            <span className='secondary-label'>{row.user_email} </span>
          </div>
        </>
      ),
    },
    {
      name: 'Role',
      selector: (row) => row['user_role'],
      cell: (user) => (
        <span dangerouslySetInnerHTML={{ __html: user.user_role }} />
      ),
      sortable: true,
    },
    {
      name: 'App Access',
      selector: (row) => row['user_role'],
      cell: (user) => <span> - </span>,
      sortable: true,
    },

    {
      name: 'Action',
      selector: (row) => row['user_id'],
      cell: (user) => (
        <button
          className='d-content-btn table-btn bg-btn d-inline-block float-none ml-0'
          onClick={() => handleEdit(user?.user_id)}
        >
          Edit
        </button>
      ),
      sortable: false,
      width: '200px',
    },
  ];

  //Edit
  const handleEdit = async (uniqueId) => {
    setUpdateModalShow(true);
    const editData = new FormData();
    editData.append('user_id', localStorage.getItem('id'));
    editData.append('user_token', localStorage.getItem('token'));
    editData.append('user_unique_id', uniqueId);
    const response = await useUserApi('get-user-detail', editData);
    setEditUserData(response?.info);
  };

  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='table-box-wrap main-box-wrapper pdglr24'>
        <div className='userBoxWrap user-section-wrapper'>
          <div className='button-top-wrap'>
            <h1 className='title'>Users</h1>
            <div
              className='d-content-btn float-right text-transform body-font-btn ml-0'
              onClick={() => setModalShow(true)}
            >
              Add User
            </div>
          </div>
          {usersList?.aaData?.length === undefined ? (
            <div className='shimmer-spinner'>
              <Spinner animation='border' variant='secondary' />
            </div>
          ) : (
            <>
              <div className='table-container ad-units-box user-table-box'>
                <DataTable
                  columns={columns}
                  data={usersList?.aaData}
                  pagination
                  paginationPerPage={10}
                  paginationServer
                  progressPending={false}
                  onChangePage={handlePageChange}
                  paginationComponent={() => (
                    <CustomPaginationComponent
                      pageNumber={usersPageNumber}
                      paginationList={usersPaginationList}
                      setPageNumber={setUsersPageNumber}
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
      <AddUserModal show={modalShow} onHide={() => setModalShow(false)} />
      <UpdateUserModal
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
      />
    </div>
  );
};

export default UserContentBox;
