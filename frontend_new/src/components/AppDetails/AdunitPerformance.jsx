/** @format */

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as EmptyTableIcon } from '../../assets/images/empty-table-icon.svg';
import useApi from '../../hooks/useApi';
import Select from 'react-select';

const AdunitPerformance = ({ overviewSelect }) => {
  const { id } = useParams();

  const [adUnitPerformanceData, setAdUnitPerformanceData] = useState([]);

  const formData = new FormData();
  formData.append('user_id', localStorage.getItem('id'));
  formData.append('user_token', localStorage.getItem('token'));
  formData.append('app_auto_id', id);
  formData.append('type', overviewSelect);
  const fetchData = async () => {
    try {
      const response = await useApi(
        'app-overview-ads-performance-list',
        formData
      );
      setAdUnitPerformanceData(response?.data?.aaData);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id, overviewSelect]);

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
      <div className='sm-title'>Ad unit performance</div>
      <div className='sorting-description-label pdglr16'>
        By total estimated earnings
      </div>
      {/* <div className='dropdown-row mrgt16 mrgb16'>
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
        {adUnitPerformanceData.length === 0 ? (
          <div className='particle-table-placeholder'>
            <EmptyTableIcon />
            <div className='empty-table-text'>No data to display</div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>App</th>
                <th>Est. earnings</th>
                <th>Impression</th>
              </tr>
            </thead>
            <tbody>
              {adUnitPerformanceData?.map((data, index) => (
                <tr key={index}>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: data?.au_display_name,
                    }}
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
        {/* <Link to='/permission' className='content-btn'>
          Add Ad Unit
        </Link> */}
      </div>
    </div>
  );
};

export default AdunitPerformance;
