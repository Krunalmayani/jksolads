/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EmptyTableIcon } from '../../assets/images/empty-table-icon.svg';
import useApi from '../../hooks/useApi';
import Select from 'react-select';

const AppPerformance = ({ overviewSelect }) => {
  const [appPerformanceData, setAppPerformanceData] = useState([]);
  const [performanceSelect, setPerformanceSelect] = useState(1);
  const formData = new FormData();

  formData.append('user_id', localStorage.getItem('id'));
  formData.append('user_token', localStorage.getItem('token'));
  formData.append('type', overviewSelect);
  const fetchData = async () => {
    try {
      const response = await useApi('dashboard-app-performance-list', formData);
      setAppPerformanceData(response?.data?.aaData);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [overviewSelect]);

  const performanceOption = [
    { value: '1', label: 'Top performers' },
    { value: '2', label: 'Top Mover' },
    { value: '3', label: 'Bottom movers' },
  ];

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  return (
    <div className='box-row box2'>
      <div className='sm-title'>App Performance</div>
      {/* <div className='dropdown-row mrgb16'>
        <div className='performance-select'>
          <Select
            placeholder={
              <div className='select-placeholder'>Top performers</div>
            }
            value={performanceOption.value}
            options={performanceOption}
            onChange={(e) => setPerformanceSelect(e.value)}
            className='overview-select'
            classNamePrefix='custom-overview-select'
            styles={customStyles}
            isSearchable={false}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              border: 0,
              fontSize: 14,
              colors: {
                ...theme.colors,
                primary25: '#eee',
                primary: '#eee',
              },
            })}
          />
        </div>
      </div> */}
      <div className='table-wrap pdglr16'>
        {appPerformanceData.length === 0 ? (
          <div className='particle-table-placeholder'>
            <EmptyTableIcon />
            <div className='empty-table-text'>No data to display</div>
          </div>
        ) : (
          <table className='app-performance-table'>
            <thead>
              <tr>
                <th>App</th>
                <th>Est. earnings</th>
                <th>Impression</th>
              </tr>
            </thead>
            <tbody>
              {appPerformanceData?.map((data, index) => (
                <tr key={index}>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: data?.app_display_name,
                    }}
                    onClick={() =>
                      localStorage.setItem('app_auto_id', data?.app_auto_id)
                    }
                  />
                  <td
                    dangerouslySetInnerHTML={{
                      __html: data?.est_earnings,
                    }}
                  ></td>
                  <td
                  // dangerouslySetInnerHTML={{
                  //   __html: data?.est_earnings,
                  // }}
                  >
                    <h5 className='mb-1 fw-normal'>0% </h5>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className='card-footer box-footer'>
        <Link to='/reports' className='content-btn'>
          View report
        </Link>
        {/* <Link to='/apps' className='content-btn'>
          Add app
        </Link> */}
      </div>
    </div>
  );
};

export default AppPerformance;
