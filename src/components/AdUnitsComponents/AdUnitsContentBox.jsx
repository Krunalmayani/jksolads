/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { MdContentCopy } from 'react-icons/md';
import Footer from '../Footer';
import { useParams } from 'react-router-dom';
import useAppsApi from '../../hooks/useAppsApi';
import DataTable from 'react-data-table-component';
import CustomLoadingIndicator from '../DataTableComponents/CustomLoadingIndicator';
import CustomNoDataComponent from '../DataTableComponents/CustomNoDataComponent';
import { Spinner } from 'react-bootstrap';
import { ReactComponent as TableSortArrow } from '../../assets/images/arrow-dwon.svg';

const AdUnitsContentBox = () => {
  const { sidebarActive } = useContext(DataContext);
  const { id } = useParams();
  const [adUnitData, setAdUnitData] = useState([]);
  const [spinnerFlag, setSpinnerFlag] = useState(true);
  const [adSearchUnitData, setAdSearchUnitData] = useState([]);

  const appFormData = new FormData();
  appFormData.append('user_id', localStorage.getItem('id'));
  appFormData.append('user_token', localStorage.getItem('token'));
  appFormData.append('app_auto_id', id);
  const fetchData = async () => {
    try {
      const response = await useAppsApi('list-app-ad-units', appFormData);
      setAdUnitData(response?.info);
      setAdSearchUnitData(response?.info);
      if (response?.status_code === 1) {
        setSpinnerFlag(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  //Copy text
  const [copyId, setCopyId] = useState('');
  const handleCopyText = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopyId(id);
      setTimeout(() => {
        setCopyId(null);
      }, 1500);
    } catch (err) {
      throw new Error(err);
    }
  };

  // Table Data
  const columns = [
    {
      name: 'Id',
      cell: (_, index) => <div>{index + 1}</div>,
      sortable: false,
      width: '70px',
    },
    {
      name: 'Ad units',
      selector: (row) => row['au_id'],
      cell: (units) => (
        <div className='copy-text ad-units'>
          <div className='copy-box'>
            <div className='unit-name'>{units?.au_display_name}</div>
            <span
              className='id-text'
              onClick={() => handleCopyText(units?.au_id)}
            >
              {units?.au_id}
              <MdContentCopy className='material-icons' />
              {units?.au_id == copyId && (
                <div className='copyMessage ad-unit'>Copied </div>
              )}
            </span>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Ad format',
      selector: (row) => row['au_format_display_name'],
      sortable: true,
    },
  ];

  //Search
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
    setAdUnitData(
      adSearchUnitData.filter((app) => {
        return (
          app?.au_format_display_name.toLowerCase().includes(searchText) ||
          app?.au_id.toLowerCase().includes(searchText)
        );
      })
    );
  };

  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='main-box-wrapper pdglr24'>
        <div className='main-box-row'>
          <>
            <div className='top-bar'>
              <h1 className='title'>Ad units</h1>
            </div>
            <div className='table-container ad-units-box unit-table'>
              <div className='custom-search-filter'>
                <input
                  type='search'
                  value={searchText}
                  onChange={handleSearch}
                  placeholder='Search for ad units by ad unit name or ad format'
                />
              </div>
              {spinnerFlag ? (
                <div className='shimmer-spinner'>
                  <Spinner animation='border' variant='secondary' />
                </div>
              ) : adUnitData.length === 0 ? (
                <div className='shimmer-spinner'>
                  <CustomNoDataComponent />
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={adUnitData}
                  pagination={false}
                  paginationPerPage={10}
                  paginationServer
                  progressPending={false}
                  progressComponent={<CustomLoadingIndicator />}
                  noDataComponent={<CustomNoDataComponent />}
                  sortIcon={<TableSortArrow />}
                />
              )}
            </div>
          </>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdUnitsContentBox;
