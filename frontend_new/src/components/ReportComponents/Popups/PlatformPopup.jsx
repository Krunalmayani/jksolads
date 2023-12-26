/**
 * @format
 * @Platform
 * @platform
 * @platform
 * @platform
 * @platform
 */

import React, { useContext, useEffect, useState } from 'react';
import { MdClose, MdSearch, MdCancel } from 'react-icons/md';
import { ReportContext } from '../../../context/ReportContext';

const PlatformPopup = ({ setTableNewData, setPageNumber }) => {
  const { platformValue, setPlatformValue, popupFlags, setPopupFlags } =
    useContext(ReportContext);

  //All Filter Popup Data
  const initialData = [
    {
      platform_auto_id: '1',
      platform_display_name: 'IOS',
      item_checked: false,
    },
    {
      platform_auto_id: '2',
      platform_display_name: 'Android',
      item_checked: false,
    },
  ];

  const [allPlatformData, setAllPlatformData] = useState(initialData);
  const [filteredPlatformData, setFilteredPlatformData] = useState(initialData);
  const [checkedPlatform, setCheckedPlatform] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setCheckedPlatform(allPlatformData.filter((item) => item.item_checked));
  }, [allPlatformData, filteredPlatformData]);

  const handleCheckboxChange = (platform, index) => {
    const updatedFilteredData = filteredPlatformData.map((item) =>
      item.platform_auto_id === platform.platform_auto_id
        ? { ...item, item_checked: !item.item_checked }
        : item
    );
    setFilteredPlatformData(updatedFilteredData);

    const updatedAllData = allPlatformData.map((item) =>
      item.platform_auto_id === updatedFilteredData[index].platform_auto_id
        ? { ...updatedFilteredData[index] }
        : { ...item }
    );
    setAllPlatformData(updatedAllData);
  };

  const handleApply = (e) => {
    e.preventDefault();
    setTableNewData([]);
    setPageNumber(1);
    setPlatformValue(checkedPlatform);
    setPopupFlags(!popupFlags);
  };
  const handleClose = (item) => {
    const updatedPlatform = allPlatformData.map((platform) =>
      platform.platform_auto_id === item.platform_auto_id
        ? { ...platform, item_checked: !platform.item_checked }
        : platform
    );
    setAllPlatformData(updatedPlatform);
    setFilteredPlatformData(updatedPlatform);
  };

  const handleClear = () => {
    setSearchText('');
    const resetData = initialData.map((v) => ({
      ...v,
      item_checked: false,
    }));
    setAllPlatformData(resetData);
    setFilteredPlatformData(resetData);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    const updatedFilteredData = allPlatformData.filter((item) =>
      item.platform_display_name.toLowerCase().includes(searchText)
    );

    setFilteredPlatformData(updatedFilteredData);
  };

  return (
    <div className='check-wrapper'>
      <button className='toggle-next filter-btn active'>
        Platform: <span className='ellipsis'></span>
      </button>
      <a
        className={
          platformValue.length > 0
            ? 'add-filter filter-btn btn-active'
            : 'add-filter filter-btn'
        }
      >
        Platform
        {platformValue.length > 0 && (
          <>
            <span className='selected-item'>
              :
              {platformValue
                ?.map((item) => {
                  return item?.platform_display_name;
                })
                ?.slice(0, 2)
                ?.map((item, index) => (
                  <span className='selected-item-value' key={index}>
                    {' '}
                    {item}{' '}
                  </span>
                ))}
              {platformValue.length > 2 && (
                <span>+{platformValue.length - 2} more </span>
              )}
            </span>
          </>
        )}
      </a>
      <div className='checkboxes full-and-multi-filter' id='Lorems'>
        <div className='filter-title-box'>
          <span className='predicate-field-label'>Platform</span>
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
                  id='searchInput7'
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
                    setFilteredPlatformData(allPlatformData);
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
                {filteredPlatformData.length === 0 ? (
                  <div className='noResult'>
                    <p>No Result Found</p>
                  </div>
                ) : (
                  filteredPlatformData?.map((platform, index) => (
                    <div className='box-check' key={index}>
                      <label>
                        <input
                          type='checkbox'
                          name={platform?.platform_auto_id}
                          value={platform?.platform_display_name}
                          className='ckkBox val'
                          checked={platform.item_checked}
                          onChange={() => handleCheckboxChange(platform, index)}
                        />
                        <span>
                          <span className='search-title'>
                            {platform?.platform_display_name}
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
              {checkedPlatform.length > 0 &&
                checkedPlatform?.map((item, index) => (
                  <div className='result-box' key={index}>
                    <span>
                      <span>{item?.platform_display_name}</span>
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

export default PlatformPopup;
