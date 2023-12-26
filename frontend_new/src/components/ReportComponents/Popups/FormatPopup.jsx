/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { MdClose, MdSearch, MdCancel } from 'react-icons/md';
import { ReportContext } from '../../../context/ReportContext';

const FormatPopup = ({ setTableNewData, filterPopupData, setPageNumber }) => {
  const { formatValue, setFormatValue, popupFlags, setPopupFlags } =
    useContext(ReportContext);

  const [allFormatData, setAllFormatData] = useState([]);
  const [filteredFormatData, setFilteredFormatData] = useState([]);
  const [checkedFormat, setCheckedFormat] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    if (filterPopupData?.all_app_list) {
      const initialFormatData = filterPopupData.all_ad_formats.map((v) => ({
        ...v,
        item_checked: false,
      }));
      setAllFormatData(initialFormatData);
      setFilteredFormatData(initialFormatData);
    }
  }, [filterPopupData]);

  useEffect(() => {
    setCheckedFormat(allFormatData.filter((item) => item.item_checked));
  }, [allFormatData, filteredFormatData]);

  const handleCheckboxChange = (format, index) => {
    const updatedFilteredData = filteredFormatData.map((item) =>
      item.au_format_auto_id === format.au_format_auto_id
        ? { ...item, item_checked: !item.item_checked }
        : item
    );
    setFilteredFormatData(updatedFilteredData);

    const updatedAllData = allFormatData.map((item) =>
      item.au_format_auto_id === updatedFilteredData[index].au_format_auto_id
        ? { ...updatedFilteredData[index] }
        : { ...item }
    );
    setAllFormatData(updatedAllData);
  };

  const handleApply = (e) => {
    e.preventDefault();
    setTableNewData([]);
    setPageNumber(1);
    setFormatValue(checkedFormat);
    setPopupFlags(!popupFlags);
  };

  const handleClose = (item) => {
    const updatedFormat = allFormatData.map((format) =>
      format.au_format_auto_id === item.au_format_auto_id
        ? { ...format, item_checked: !format.item_checked }
        : format
    );
    setAllFormatData(updatedFormat);
    setFilteredFormatData(updatedFormat);
  };

  const handleClear = () => {
    setSearchText('');
    const resetData = filterPopupData.all_ad_formats.map((v) => ({
      ...v,
      item_checked: false,
    }));
    setAllFormatData(resetData);
    setFilteredFormatData(resetData);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    const updatedFilteredData = allFormatData.filter((item) =>
      item.au_format_display_name.toLowerCase().includes(searchText)
    );

    setFilteredFormatData(updatedFilteredData);
  };
  return (
    <div className='check-wrapper'>
      <button className='toggle-next filter-btn active'>
        Format: <span className='ellipsis'></span>
      </button>
      <a
        className={
          formatValue.length > 0
            ? 'add-filter filter-btn btn-active'
            : 'add-filter filter-btn'
        }
      >
        Format
        {formatValue.length > 0 && (
          <>
            <span className='selected-item'>
              :
              {formatValue
                ?.map((item) => {
                  return item?.au_format_display_name;
                })
                ?.slice(0, 2)
                ?.map((item, index) => (
                  <span className='selected-item-value' key={index}>
                    {' '}
                    {item}{' '}
                  </span>
                ))}
              {formatValue.length > 2 && (
                <span>+{formatValue.length - 2} more </span>
              )}
            </span>
          </>
        )}
      </a>
      <div className='checkboxes full-and-multi-filter' id='Lorems'>
        <div className='filter-title-box'>
          <span className='predicate-field-label'>Format</span>
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
                  id='searchInput3'
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
                    setFilteredFormatData(allFormatData);
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
                {filteredFormatData.length === 0 ? (
                  <div className='noResult'>
                    <p>No Result Found</p>
                  </div>
                ) : (
                  filteredFormatData?.map((format, index) => (
                    <div className='box-check' key={index}>
                      <label>
                        <input
                          type='checkbox'
                          name={format?.au_format_auto_id}
                          value={format?.au_format_display_name}
                          className='ckkBox val'
                          checked={format.item_checked}
                          onChange={() => handleCheckboxChange(format, index)}
                        />
                        <span className='search-title'>
                          {format?.au_format_display_name}
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
              {checkedFormat.length > 0 &&
                checkedFormat?.map((item, index) => (
                  <div className='result-box' key={index}>
                    <span>
                      <span>{item?.au_format_display_name}</span>
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

export default FormatPopup;
