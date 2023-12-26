/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import useAccountApi from '../../hooks/useAccountApi';
import AddAccountModal from './AddAccountModal';
import UpdateAccountModal from './UpdateAccountModal';
import Footer from '../Footer';
import useGeneratePagination from '../../hooks/useGeneratePagination';
import CustomLoadingIndicator from '../DataTableComponents/CustomLoadingIndicator';
import CustomNoDataComponent from '../DataTableComponents/CustomNoDataComponent';
import CustomPaginationComponent from '../CustomPaginationComponent';
import DataTable from 'react-data-table-component';
import { Spinner } from 'react-bootstrap';
import { ReactComponent as TableSortArrow } from '../../assets/images/arrow-dwon.svg';

const AccountContentBox = () => {
  const {
    addAccFlag,
    setAddAccFlag,
    sidebarActive,
    accModalShow,
    setAccModalShow,
    accUpdateModalShow,
    setAccUpdateModalShow,
    setEditAccData,
  } = useContext(DataContext);

  const [AccountList, setAccountList] = useState({});
  const [accPageNumber, setAccPageNumber] = useState(1);
  const [accPageLength, setAccPageLength] = useState(10);
  const [accTotalPages, setAccTotalPages] = useState('');
  const [accPaginationList, setAccPaginationList] = useState([]);
  const [accOrder, setAccOrder] = useState('');
  const [accColumnName, setAccColumnName] = useState('');

  const formData = new FormData();
  formData.append('user_id', localStorage.getItem('id'));
  formData.append('user_token', localStorage.getItem('token'));
  formData.append('start', accPageLength * (accPageNumber - 1));
  formData.append('length', accPageLength);
  formData.append('iSortCol_0', accColumnName);
  if (accOrder.length > 0) {
    formData.append('sSortDir_0', accOrder);
  }

  //Sort Function
  const customSort = (column, sortDirection) => {
    setAccColumnName(column.id - 2);
    setAccOrder(sortDirection.toUpperCase());
    setAddAccFlag(!addAccFlag);
  };

  const fetchAccountData = async () => {
    try {
      const response = await useAccountApi('admob-account-list', formData);
      setAccountList(response);
      setAccTotalPages(response?.iTotalDisplayRecords / accPageLength);
    } catch (error) {
      throw new Error(error);
    }
  };
  // Handle Page Change
  const handlePageChange = () => {
    fetchAccountData();
  };
  useEffect(() => {
    fetchAccountData();
  }, [addAccFlag, accPageNumber]);
  useEffect(() => {
    const paginationLinks = useGeneratePagination(accTotalPages);
    setAccPaginationList(paginationLinks);
  }, [accTotalPages]);

  const columns = [
    {
      name: 'Id',
      selector: (row) => row['increment_id'],
      sortable: false,
      width: '100px',
    },
    // {
    //   name: 'Name',
    //   selector: (row) => row['admob_pub_id'],
    //   sortable: true,
    //   width: '200px',
    // },
    {
      name: 'Email',
      selector: (row) => row['admob_email'],
      sortable: true,
    },
    {
      name: 'Public Id',
      selector: (row) => row['admob_pub_id'],
      sortable: true,
    },
    {
      name: 'Last Updated Date',
      selector: (row) => row['admob_updated_at'],
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => row['admob_pub_id'],
      width: '200px',
      cell: (account) => (
        <button
          className='d-content-btn table-btn bg-btn d-inline-block float-none ml-0'
          onClick={() => handleAccEdit(account?.admob_pub_id)}
        >
          edit
        </button>
      ),
      sortable: false,
    },
  ];

  //Edit
  const handleAccEdit = async (pubId) => {
    setAccUpdateModalShow(true);
    const editAccountData = new FormData();
    editAccountData.append('user_id', localStorage.getItem('id'));
    editAccountData.append('user_token', localStorage.getItem('token'));
    editAccountData.append('admob_pub_id', pubId);
    const response = await useAccountApi(
      'get-admob-account-detail',
      editAccountData
    );
    setEditAccData(response?.info);
  };

  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='table-box-wrap main-box-wrapper pdglr24'>
        <div className='userBoxWrap user-section-wrapper'>
          <div className='button-top-wrap'>
            <h1 className='title'>Accounts</h1>
            <div
              className='d-content-btn float-right text-transform body-font-btn ml-0'
              onClick={() => setAccModalShow(true)}
            >
              Add Account
            </div>
          </div>
          {AccountList?.aaData?.length === undefined ? (
            <div className='shimmer-spinner'>
              <Spinner animation='border' variant='secondary' />
            </div>
          ) : (
            <>
              <div className='table-container ad-units-box user-table-box'>
                <DataTable
                  columns={columns}
                  data={AccountList?.aaData}
                  pagination
                  paginationPerPage={10}
                  paginationServer
                  progressPending={false}
                  onChangePage={handlePageChange}
                  paginationComponent={() => (
                    <CustomPaginationComponent
                      pageNumber={accPageNumber}
                      paginationList={accPaginationList}
                      setPageNumber={setAccPageNumber}
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
      <AddAccountModal
        show={accModalShow}
        onHide={() => setAccModalShow(false)}
      />
      <UpdateAccountModal
        show={accUpdateModalShow}
        onHide={() => setAccUpdateModalShow(false)}
      />
    </div>
  );
};

export default AccountContentBox;
