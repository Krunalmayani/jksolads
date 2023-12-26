/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { MdClose, MdSearch, MdCancel } from 'react-icons/md';
import { ReportContext } from '../../../context/ReportContext';

const DimensionsPopup = ({ setTableNewData, setPageNumber }) => {
  const { setDimensionValue, popupFlags, setPopupFlags } =
    useContext(ReportContext);

  //All Filter Popup Data
  const initialData = [
    {
      dimension_auto_id: '1',
      dimension_display_name: 'Date',
      dimension_value: 'report_date',
      dimension_checked: false,
    },
    {
      dimension_auto_id: '2',
      dimension_display_name: 'App',
      dimension_value: 'app_display_name',
      dimension_checked: true,
    },
    {
      dimension_auto_id: '3',
      dimension_display_name: 'Ad Unit',
      dimension_value: 'report_au_auto_id',
      dimension_checked: false,
    },
    {
      dimension_auto_id: '4',
      dimension_display_name: 'Format',
      dimension_value: 'au_format_auto_id',
      dimension_checked: false,
    },
    {
      dimension_auto_id: '5',
      dimension_display_name: 'Country',
      dimension_value: 'country_name',
      dimension_checked: false,
    },
  ];
  const [allDimensionData, setAllDimensionData] = useState(initialData);

  // checkbox changes
  const handleCheckboxChange = (index) => {
    const updatedDimensions = [...allDimensionData];
    updatedDimensions[index].dimension_checked =
      !updatedDimensions[index].dimension_checked;
    setAllDimensionData(updatedDimensions);
  };
  const [checkedDimension, setCheckedDimension] = useState([]);
  useEffect(() => {
    const copiedDimensionData = [...allDimensionData];
    setCheckedDimension(
      copiedDimensionData.filter((item) => {
        return item.dimension_checked;
      })
    );
  }, [allDimensionData]);

  const handleApply = (e) => {
    e.preventDefault();
    setTableNewData([]);
    setPageNumber(1);
    setDimensionValue(checkedDimension);
    setPopupFlags(!popupFlags);
  };
  const handleClose = (item) => {
    const updatedDimensions = allDimensionData.map((dimension) => {
      if (dimension.dimension_auto_id === item.dimension_auto_id) {
        return {
          ...dimension,
          dimension_checked: !dimension.dimension_checked,
        };
      }
      return dimension;
    });
    setAllDimensionData(updatedDimensions);
  };

  //Search
  const [searchAllDimensionData, setSearchAllDimensionData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
    setAllDimensionData(
      searchAllDimensionData.filter((dimension) => {
        return dimension?.dimension_display_name
          .toLowerCase()
          .includes(searchText);
      })
    );
  };
  useEffect(() => {
    setDimensionValue(checkedDimension);
    setSearchAllDimensionData(initialData);
    //setPopupFlags(!popupFlags);
  }, [checkedDimension]);

  const handleClear = () => {
    setSearchText('');
    setAllDimensionData(initialData);
  };

  return (
    <div className='check-wrapper'>
      <button className='toggle-next filter-btn active'>
        Dimension: <span className='ellipsis'></span>
      </button>
      <a className='add-filter filter-btn active'>Dimension</a>
      <div className='checkboxes full-and-multi-filter' id='Lorems'>
        <div className='filter-title-box'>
          <span className='predicate-field-label'>Dimension</span>
          <a className='close-filter'>
            <MdClose className='material-icons' />
          </a>
        </div>
        <div className='check-boxes-inner'>
          <div className='left-check-box box2'>
            <div className='search-input'>
              <div className='box'>
                <input
                  className='input search-btn-input focus-border'
                  id='searchInput9'
                  onChange={handleSearch}
                  value={searchText}
                  required
                  placeholder='Search'
                  autoComplete='off'
                />
                <a
                  href='#'
                  className='clear-icon-btn i-btn'
                  onClick={() => {
                    setSearchText('');
                    setAllDimensionData(searchAllDimensionData);
                  }}
                >
                  <MdCancel className='material-icons' />
                </a>
                <a href='#' className='search-icon-btn i-btn'>
                  <MdSearch className='material-icons' />
                </a>
                <div className='border-active'></div>
              </div>
            </div>
            <div className='all-select-row'>
              <form onSubmit={handleApply}>
                {allDimensionData.length === 0 ? (
                  <div className='noResult'>
                    <p>No Result Found</p>
                  </div>
                ) : (
                  allDimensionData?.map((dimension, index) => (
                    <div className='box-check' key={index}>
                      <label>
                        <input
                          type='checkbox'
                          name={dimension?.dimension_value}
                          value={dimension?.dimension_display_name}
                          className='ckkBox val'
                          checked={dimension.dimension_checked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <span>
                          <span className='search-title'>
                            {dimension?.dimension_display_name}
                          </span>
                        </span>
                      </label>
                    </div>
                  ))
                )}
                <div className='apply-btn-wrap text-right'>
                  <button type='submit' className='apply-btn'>
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='right-result-box box2'>
            <div className='none-selected-text'>
              <span></span>
              <a className='custom-clear-all' onClick={handleClear}>
                Clear all
              </a>
            </div>
            <div className='right-result-row'>
              {checkedDimension.length > 0 &&
                checkedDimension?.map((item, index) => (
                  <div className='result-box' key={index}>
                    <span>
                      <span>{item?.dimension_display_name}</span>
                    </span>
                    <a
                      href='#'
                      className='result-cancel-btn i-btn'
                      onClick={() => handleClose(item)}
                    >
                      <MdCancel className='material-icons' />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimensionsPopup;
