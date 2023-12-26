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
import useApi from '../../hooks/useApi';
import { MdAdd } from 'react-icons/md';
import AddCronModal from './AddCronModal';
import UpdateCronModal from './UpdateCronModal';
import { ReactComponent as TableSortArrow } from '../../assets/images/arrow-dwon.svg';

const CronContentBox = () => {
  const { cronFlag, setCronFlag, sidebarActive, modalShow, setModalShow } =
    useContext(DataContext);

  const [cronList, setCronList] = useState([]);
  const [cronPageNumber, setCronPageNumber] = useState(1);
  const [cronPageLength, setCronPageLength] = useState(10);
  const [cronTotalPages, setCronTotalPages] = useState('');
  const [cronPaginationList, setCronPaginationList] = useState([]);
  const [cronOrder, setCronOrder] = useState('');
  const [cronColumnName, setCronColumnName] = useState('');
  const [cronEditData, setCronEditData] = useState([]);

  const [updateCronShow, setUpdateCronShow] = useState(false);

  const formData = new FormData();
  formData.append('user_id', localStorage.getItem('id'));
  formData.append('user_token', localStorage.getItem('token'));
  formData.append('start', cronPageLength * (cronPageNumber - 1));
  formData.append('length', cronPageLength);
  formData.append('iSortCol_0', cronColumnName);
  if (cronOrder.length > 0) {
    formData.append('sSortDir_0', cronOrder);
  }

  const fetchData = async () => {
    try {
      const response = await useApi('cron-list', formData);
      setCronList(response?.data?.aaData);
      setCronTotalPages(response?.data?.iTotalDisplayRecords / cronPageLength);
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
  }, [cronFlag, cronPageNumber]);

  useEffect(() => {
    const paginationLinks = useGeneratePagination(cronTotalPages);
    setCronPaginationList(paginationLinks);
  }, [cronTotalPages]);

  const columns = [
    {
      name: 'Id',
      selector: (row) => row['increment_id'],
      sortable: false,
      width: '70px',
    },
    {
      name: 'Minute',
      selector: (row) => row['cron_minute'],
      sortable: true,
      width: '150px',
    },
    {
      name: 'Hour',
      selector: (row) => row['cron_hour'],
      sortable: true,
      width: '150px',
    },
    {
      name: 'Day',
      selector: (row) => row['cron_day'],
      sortable: true,
      width: '150px',
    },
    {
      name: 'Month',
      selector: (row) => row['cron_month'],
      sortable: true,
      width: '150px',
    },
    {
      name: 'Weekday',
      selector: (row) => row['cron_weekday'],
      sortable: true,
      width: '150px',
    },
    {
      name: 'Command',
      selector: (row) => row['cron_command'],
      sortable: true,
      cell: (row) => <div className='cron-command'>{row?.cron_command}</div>,
    },
    {
      name: 'Action',
      selector: (row) => row['total_ad_units'],
      cell: (cron) => (
        <>
          <button
            className='d-content-btn table-btn bg-btn d-inline-block float-none ml-0'
            onClick={() => handleEdit(cron?.cron_auto_id)}
          >
            Edit
          </button>
          <button
            className='d-content-btn table-btn bg-btn d-inline-block float-none ml-0 delete-btn'
            onClick={() => handleDelete(cron?.cron_auto_id)}
          >
            Delete
          </button>
        </>
      ),
      sortable: false,
      width: '250px',
    },
  ];

  //Delete
  const handleDelete = async (cron_auto_id) => {
    const deleteFormData = new FormData();
    deleteFormData.append('user_id', localStorage.getItem('id'));
    deleteFormData.append('user_token', localStorage.getItem('token'));
    deleteFormData.append('cron_auto_id', cron_auto_id);
    try {
      const response = await useApi('delete-cron', deleteFormData);
      if (response?.data?.status_code === 1) {
        setCronFlag(!cronFlag);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  //Sort Function
  const customSort = (column, sortDirection) => {
    setCronColumnName(column.id - 1);
    setCronOrder(sortDirection.toUpperCase());
    setCronFlag(!cronFlag);
  };

  //Edit
  const handleEdit = async (cron_auto_id) => {
    setUpdateCronShow(true);
    const editData = new FormData();
    editData.append('user_id', localStorage.getItem('id'));
    editData.append('user_token', localStorage.getItem('token'));
    editData.append('cron_auto_id', cron_auto_id);
    const response = await useApi('get-cron-detail', editData);
    setCronEditData(response?.data?.info);
  };

  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='table-box-wrap main-box-wrapper pdglr24'>
        <div className='userBoxWrap user-section-wrapper'>
          <div className='button-top-wrap'>
            <h1 className='title'>Cron</h1>
            <div
              className='d-content-btn float-right text-transform body-font-btn ml-0'
              onClick={() => setModalShow(true)}
            >
              Add Cron
            </div>
          </div>
          {cronList?.length === 0 ? (
            <div className='shimmer-spinner'>
              <Spinner animation='border' variant='secondary' />
            </div>
          ) : (
            <>
              <div className='table-container ad-units-box cron-table-box'>
                <DataTable
                  columns={columns}
                  data={cronList}
                  pagination
                  paginationPerPage={10}
                  paginationServer
                  progressPending={false}
                  onChangePage={handlePageChange}
                  paginationComponent={() => (
                    <CustomPaginationComponent
                      pageNumber={cronPageNumber}
                      paginationList={cronPaginationList}
                      setPageNumber={setCronPageNumber}
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
      {
        <>
          <AddCronModal show={modalShow} onHide={() => setModalShow(false)} />
          <UpdateCronModal
            show={updateCronShow}
            onHide={() => setUpdateCronShow(false)}
            editdata={cronEditData}
          />
        </>
      }
    </div>
  );
};

export default CronContentBox;
