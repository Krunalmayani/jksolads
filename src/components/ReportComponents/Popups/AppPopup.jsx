/** @format */

import React, { useContext, useState, useEffect } from 'react';
import { MdClose, MdSearch, MdCancel } from 'react-icons/md';
import { ReportContext } from '../../../context/ReportContext';

const AppPopup = ({
  setTableNewData,
  filterPopupData,
  setPageNumber,
  filterFlag,
}) => {
  const { appValue, setAppValue, popupFlags, setPopupFlags, setFilterFlag } =
    useContext(ReportContext);

  const [allAppData, setAllAppData] = useState([]);
  const [filteredAppData, setFilteredAppData] = useState([]);
  const [checkedApp, setCheckedApp] = useState([]);
  const [searchText, setSearchText] = useState('');

  // All Filter Popup Data
  useEffect(() => {
    if (filterPopupData?.all_app_list) {
      const initialAppData = filterPopupData.all_app_list.map((v) => ({
        ...v,
        item_checked: false,
      }));
      setAllAppData(initialAppData);
      setFilteredAppData(initialAppData);
    }
  }, [filterPopupData]);

  useEffect(() => {
    setCheckedApp(allAppData.filter((item) => item.item_checked));
  }, [allAppData, filteredAppData]);

  const handleCheckboxChange = (app, index) => {
    const updatedFilteredData = filteredAppData.map((item) =>
      item.app_display_name === app.app_display_name
        ? { ...item, item_checked: !item.item_checked }
        : item
    );
    setFilteredAppData(updatedFilteredData);

    const updatedAllData = allAppData.map((item) =>
      item.app_auto_id === updatedFilteredData[index].app_auto_id
        ? { ...updatedFilteredData[index] }
        : { ...item }
    );
    setAllAppData(updatedAllData);
  };

  const handleApply = (e) => {
    e.preventDefault();
    setTableNewData([]);
    setPageNumber(1);
    setFilterFlag(!filterFlag);
    setAppValue(checkedApp);
    setPopupFlags(!popupFlags);
  };
  const handleClose = (item) => {
    const updatedApp = allAppData.map((app) =>
      app.app_auto_id === item.app_auto_id
        ? { ...app, item_checked: !app.item_checked }
        : app
    );
    setAllAppData(updatedApp);
    setFilteredAppData(updatedApp);
  };

  const handleClear = () => {
    setSearchText('');
    const resetData = filterPopupData.all_app_list.map((v) => ({
      ...v,
      item_checked: false,
    }));
    setAllAppData(resetData);
    setFilteredAppData(resetData);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    const updatedFilteredData = allAppData.filter((item) =>
      item.app_display_name.toLowerCase().includes(searchText)
    );

    setFilteredAppData(updatedFilteredData);
  };

  return (
    <div className='check-wrapper'>
      <button className='toggle-next filter-btn active'>
        App: <span className='ellipsis'></span>
      </button>
      <a
        className={
          appValue.length > 0
            ? 'add-filter filter-btn btn-active'
            : 'add-filter filter-btn'
        }
      >
        App
        {appValue.length > 0 ? (
          <>
            <span className='selected-item'>
              :
              {appValue
                ?.map((item) => {
                  return item?.app_display_name;
                })
                ?.slice(0, 2)
                ?.map((item, index) => (
                  <span className='selected-item-value' key={index}>
                    {' '}
                    {item}{' '}
                  </span>
                ))}
              {appValue.length > 2 && <span>+{appValue.length - 2} more </span>}
            </span>
          </>
        ) : null}
      </a>
      <div className='checkboxes full-and-multi-filter' id='Lorems'>
        <div className='filter-title-box'>
          <span className='predicate-field-label'>App</span>
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
                  id='searchInput1'
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
                    setFilteredAppData(allAppData);
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
                {filteredAppData?.length === 0 ? (
                  <div className='noResult'>
                    <p>No Result Found</p>
                  </div>
                ) : (
                  filteredAppData?.map((app, index) => (
                    <div className='box-check' key={index}>
                      <label>
                        <input
                          type='checkbox'
                          name={app?.app_auto_id}
                          value={app?.app_display_name}
                          className='ckkBox val'
                          checked={app.item_checked}
                          onChange={() => handleCheckboxChange(app, index)}
                        />
                        <span>
                          <span className='search-title'>
                            {app?.app_display_name}
                          </span>
                          <div className='secondary-label'>
                            Free |{' '}
                            {(app?.app_platform == 1 && 'IOS') ||
                              (app?.app_platform == 2 && 'Android')}
                          </div>
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
              {checkedApp?.map((item, index) => (
                <div className='result-box' key={index}>
                  <span>
                    <span>{item?.app_display_name}</span>
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

export default AppPopup;
