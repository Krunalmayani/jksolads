/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import Footer from '../Footer';
import useApi from '../../hooks/useApi';
import Spinner from 'react-bootstrap/Spinner';
import DateRangePopup from './Popups/DateRangePopup';
import AppPopup from './Popups/AppPopup';
import CountryPopup from './Popups/CountryPopup';
import FormatPopup from './Popups/FormatPopup';
import PlatformPopup from './Popups/PlatformPopup';
import { ReportContext } from '../../context/ReportContext';
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from 'react-data-table-component';
import CustomPaginationComponent from '../CustomPaginationComponent';
import CustomNoDataComponent from '../DataTableComponents/CustomNoDataComponent';
import CustomLoadingIndicator from '../DataTableComponents/CustomLoadingIndicator';
import useGeneratePagination from '../../hooks/useGeneratePagination';
import useReportApi from '../../hooks/useReportApi';
//import DimensionsPopup from './Popups/DimentionsPopup';
import AdUnitsPopup from './Popups/AdUnitsPopup';
import DimensionBox from './DimensionBox';
import { MdMoreVert, MdDownload, MdTableChart } from 'react-icons/md';
import { ReactComponent as TableSortArrow } from '../../assets/images/arrow-dwon.svg';

import { useLocation } from 'react-router-dom';

const ReportContentBox = () => {
  const { sidebarActive, dateRange } = useContext(DataContext);
  const {
    appValue,
    countryValue,
    formatValue,
    platformValue,
    popupFlags,
    setPopupFlags,
    dimensionValue,
    unitValue,
    filterFlag,
    setAppValue,
    setCountryValue,
    setFormatValue,
    setPlatformValue,
    setUnitValue,
  } = useContext(ReportContext);

  const finalApp = appValue?.map((item) => {
    return item?.app_auto_id;
  });
  const finalCountry = countryValue?.map((item) => {
    return item?.country_auto_id;
  });
  const finalFormat = formatValue?.map((item) => {
    return item?.au_format_auto_id;
  });
  const finalPlatform = platformValue?.map((item) => {
    return item?.platform_auto_id;
  });
  const finalUnit = unitValue?.map((item) => {
    return item?.unit_auto_id;
  });
  const finalDimension = dimensionValue?.map((item) => {
    return item?.dimension_value;
  });

  const [tableNewData, setTableNewData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [totalPages, setTotalPages] = useState('');
  const [paginationList, setPaginationList] = useState([]);
  const [order, setOrder] = useState('');
  const [columnName, setColumnName] = useState('');
  const [totalRecordsData, setTotalRecordsData] = useState([]);

  const newStartDate = new Date(dateRange[0]?.startDate);
  const selectedStartDate = newStartDate.toLocaleDateString('en-GB');
  const newEndDate = new Date(dateRange[0]?.endDate);
  const selectedEndDate = newEndDate.toLocaleDateString('en-GB');
  const formData = new FormData();
  formData.append('user_id', localStorage.getItem('id'));
  formData.append('user_token', localStorage.getItem('token'));
  formData.append('start', pageLength * (pageNumber - 1));
  formData.append('length', pageLength);
  useEffect(() => {});
  if (finalApp?.length > 0 && filterFlag) {
    formData.append('selected_apps', finalApp.join(','));
  }
  if (finalCountry.length > 0)
    formData.append('selected_country', finalCountry.join(','));
  if (finalFormat.length > 0)
    formData.append('selected_ad_format', finalFormat.join(','));
  if (finalPlatform.length > 0)
    formData.append('selected_app_platform', finalPlatform.join(','));
  if (finalUnit.length > 0)
    formData.append('selected_ad_units', finalUnit.join(','));
  if (order.length > 0) formData.append('sSortDir_0', order);
  if (columnName.length > 0) formData.append('iSortCol_0', columnName);
  if (dateRange.length > 0)
    formData.append(
      'analytics_date_range',
      `${selectedStartDate}-${selectedEndDate}`
    );
  useEffect(() => {
    formData.append('selected_dimension', 'app_display_name');
  }, []);
  if (finalDimension.length > 0) {
    formData.append('selected_dimension', finalDimension.join(','));
  }

  let location = useLocation();
  useEffect(() => {
    setAppValue([]);
    setCountryValue([]);
    setFormatValue([]);
    setPlatformValue([]);
    setUnitValue([]);
  }, [location]);

  //Sort Function
  const customSort = (column, sortDirection) => {
    const columnName = String(column?.sortValue);
    setColumnName(columnName);
    setOrder(sortDirection.toUpperCase());
    setPopupFlags(!popupFlags);
  };

  //Fetch Data
  const fetchData = async () => {
    try {
      const response = await useApi('analytics-list', formData);
      setTableNewData(response?.data);
      setTotalRecordsData(response?.data?.total_records_data);
      setTotalPages(response?.data.iTotalDisplayRecords / pageLength);
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
  }, [pageNumber, popupFlags]);

  useEffect(() => {
    const paginationLinks = useGeneratePagination(totalPages);
    setPaginationList(paginationLinks);
  }, [totalPages]);

  const columns = [
    {
      name: 'Apps',
      selector: (row) => row['app_display_name'],
      cell: (app) => (
        <div className='app-item'>
          <div className='app-img'>
            <img
              alt=''
              aria-hidden='true'
              className='app-icon'
              src={app?.app_icon}
            />
          </div>
          <div className='label-container'>
            <span className='primary-label'>{app?.app_display_name}</span>
            <span className='secondary-label'>
              {(app?.app_platform == '1' && 'IOS') ||
                (app?.app_platform == '2' && 'Android')}
            </span>
          </div>
        </div>
      ),
      sortable: true,
      width: '200px',
      sortValue: 'app_display_name',
    },
    {
      name: 'Display Name',
      selector: (row) => row['au_display_name'],
      sortable: true,
      sortValue: 'au_display_name',
    },
    {
      name: 'Date',
      selector: (row) => row['report_date'],
      sortable: true,
      sortValue: 'report_date',
    },
    {
      name: 'Est. earnings',
      selector: (row) => row['estimated_earnings'],
      sortable: true,
      sortValue: 'estimated_earnings',
    },
    {
      name: 'Observed eCPM',
      selector: (row) => row['observed_ecpm'],
      sortable: true,
      sortValue: 'observed_ecpm',
    },
    {
      name: 'Requests',
      selector: (row) => row['ad_requests'],
      sortable: true,
      sortValue: 'ad_requests',
    },
    {
      name: 'Match rate (%)',
      selector: (row) => row['match_rate'],
      sortable: true,
      sortValue: 'match_rate',
    },
    {
      name: 'Matched requests',
      selector: (row) => row['matched_requests'],
      sortable: true,
      sortValue: 'matched_requests',
    },
    {
      name: 'Show rate (%)',
      selector: (row) => row['show_rate'],
      sortable: true,
      sortValue: 'show_rate',
    },
    {
      name: 'Impressions',
      selector: (row) => row['impressions'],
      sortable: true,
      sortValue: 'impressions',
    },
    {
      name: 'CTR (%)',
      selector: (row) => row['impression_ctr'],
      sortable: true,
      sortValue: 'impression_ctr',
    },
    {
      name: 'Clicks',
      selector: (row) => row['clicks'],
      sortable: true,
      sortValue: 'clicks',
    },
  ];

  //Filter API call
  const [filterPopupData, setFilterPopupData] = useState([]);
  const filterFormData = new FormData();
  filterFormData.append('user_id', localStorage.getItem('id'));
  filterFormData.append('user_token', localStorage.getItem('token'));

  async function fetchFilterData() {
    const response = await useReportApi(
      'get-analytics-filtering-data',
      filterFormData
    );
    setFilterPopupData(response);
  }

  useEffect(() => {
    fetchFilterData();
  }, []);

  //
  const optionsOne = {
    axisY: {
      valueFormatString: '$#.00',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'line',
        name: '2016',
        color: '#1967d2',
        dataPoints: [
          { y: 155, label: 'Jan' },
          { y: 150, label: 'Feb' },
          { y: 152, label: 'Mar' },
          { y: 148, label: 'Apr' },
          { y: 142, label: 'May' },
          { y: 150, label: 'Jun' },
          { y: 146, label: 'Jul' },
          { y: 149, label: 'Aug' },
          { y: 153, label: 'Sept' },
          { y: 158, label: 'Oct' },
          { y: 154, label: 'Nov' },
          { y: 150, label: 'Dec' },
        ],
      },
      {
        type: 'line',
        name: '2017',
        dataPoints: [
          { y: 172, label: 'Jan' },
          { y: 173, label: 'Feb' },
          { y: 175, label: 'Mar' },
          { y: 172, label: 'Apr' },
          { y: 162, label: 'May' },
          { y: 165, label: 'Jun' },
          { y: 172, label: 'Jul' },
          { y: 168, label: 'Aug' },
          { y: 175, label: 'Sept' },
          { y: 170, label: 'Oct' },
          { y: 165, label: 'Nov' },
          { y: 169, label: 'Dec' },
        ],
      },
    ],
  };
  const optionsTwo = {
    // axisY: {
    //   valueFormatString: '$#.00',
    // },
    toolTip: {
      shared: true,
    },
    elements: { point: { radius: 0 } },
    data: [
      {
        type: 'line',
        name: '2016',
        color: '#1967d2',
        dataPoints: [
          { y: 1, label: 'Jan' },
          { y: 5, label: 'Feb' },
          { y: 10, label: 'Mar' },
          { y: 14, label: 'Apr' },
          { y: 12, label: 'May' },
          { y: 10, label: 'Jun' },
          { y: 16, label: 'Jul' },
          { y: 19, label: 'Aug' },
          { y: 13, label: 'Sept' },
          { y: 18, label: 'Oct' },
          { y: 14, label: 'Nov' },
          { y: 10, label: 'Dec' },
        ],
      },
      {
        type: 'line',
        name: '2017',
        dataPoints: [
          { y: 12, label: 'Jan' },
          { y: 13, label: 'Feb' },
          { y: 15, label: 'Mar' },
          { y: 12, label: 'Apr' },
          { y: 12, label: 'May' },
          { y: 15, label: 'Jun' },
          { y: 12, label: 'Jul' },
          { y: 18, label: 'Aug' },
          { y: 15, label: 'Sept' },
          { y: 10, label: 'Oct' },
          { y: 15, label: 'Nov' },
          { y: 19, label: 'Dec' },
        ],
      },
    ],
  };

  const [isSwitch, setIsSwitch] = useState(true);

  return (
    <div className={`right-box-wrap ${sidebarActive ? 'open-box' : ''}`}>
      <div className='table-box-wrap main-box-wrapper pdglr24 report-table-box'>
        <div className='userBoxWrap user-section-wrapper'>
          <div className='popup-full-wrapper reports-popup-box active'>
            <div className='action-bar-container'>
              <div className='middle-section'>
                <h1 title='Set up a new User'>Ads Activity Report</h1>
                {/* <div className='right-box'>
                  <a
                    className='d-content-btn w-btn'
                    data-toggle='modal'
                    data-target='#basicModal'
                  >
                    Save to reports
                  </a>
                </div> */}
              </div>
              {/* <div className='more-button'>
                <MdMoreVert className='material-icons' />
                <div className='more-box w-250'>
                  <a>
                    <span className='material-icons'>
                      <MdTableChart />
                    </span>
                    {!isSwitch ? 'Hide Table' : 'Show Table'}
                    <label className='switch' htmlFor='checkbox'>
                      <input
                        type='checkbox'
                        id='checkbox'
                        value={isSwitch}
                        onChange={() => setIsSwitch(!isSwitch)}
                      />
                      <div className='slider round'></div>
                    </label>
                  </a>
                  <div className='border-box'>
                    <a href=''>
                      <span className='material-icons'>
                        <MdDownload />
                      </span>
                      Download CSV
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
            <div className='popup-full-box form-box-wrap form-wizard'>
              <div className='filter-bar-wrap'>
                <div className='filter-title'>
                  <span>Filter</span>
                </div>
                <div className='filter-box'>
                  <DateRangePopup
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    setPageNumber={setPageNumber}
                  />
                  {/* <DimensionsPopup
                    setTableNewData={setTableNewData}
                    filterPopupData
                  /> */}
                  {/* <AdUnitsPopup
                    setTableNewData={setTableNewData}
                    filterPopupData={filterPopupData}
                  /> */}
                  <AppPopup
                    setTableNewData={setTableNewData}
                    filterPopupData={filterPopupData}
                    setPageNumber={setPageNumber}
                  />
                  <CountryPopup
                    setTableNewData={setTableNewData}
                    filterPopupData={filterPopupData}
                    setPageNumber={setPageNumber}
                  />
                  <FormatPopup
                    setTableNewData={setTableNewData}
                    filterPopupData={filterPopupData}
                    setPageNumber={setPageNumber}
                  />
                  <PlatformPopup
                    setTableNewData={setTableNewData}
                    setPageNumber={setPageNumber}
                  />
                </div>
              </div>
              {/* <div className='feed-cards d-flex report-chart-wrap'>
                <div className='box-row box2'>
                  <div className='sm-title'>Est. Earnings</div>
                  <div className='card-content pdglr16'>
                    <div className='report-chart'>
                      <ReportChart options={optionsOne} />
                    </div>
                  </div>
                </div>
                <div className='box-row box2'>
                  <div className='sm-title'>Impressions & Observed eCPM</div>
                  <div className='card-content pdglr16'>
                    <div className='revenue-chart'>
                      <ReportChart options={optionsTwo} />
                    </div>
                  </div>
                </div>
              </div> */}
              {isSwitch && (
                <div className='popup-box-wrapper report-table-popup-box'>
                  <div className='box-wrapper table-container '>
                    {tableNewData.length === 0 ? (
                      <div className='shimmer-spinner'>
                        <Spinner animation='border' variant='secondary' />
                      </div>
                    ) : (
                      <DataTable
                        columns={columns}
                        data={tableNewData.aaData}
                        pagination
                        paginationPerPage={10}
                        paginationServer
                        progressPending={false}
                        onChangePage={handlePageChange}
                        paginationComponent={() => (
                          <CustomPaginationComponent
                            pageNumber={pageNumber}
                            paginationList={paginationList}
                            setPageNumber={setPageNumber}
                            totalRecords={tableNewData?.total_records_data}
                          />
                        )}
                        progressComponent={<CustomLoadingIndicator />}
                        noDataComponent={<CustomNoDataComponent />}
                        onSort={customSort}
                        sortServer
                        sortIcon={<TableSortArrow />}
                      />
                    )}
                  </div>
                  <div className='matrix-box'>
                    <DimensionBox setPageNumber={setPageNumber} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ReportContentBox;
