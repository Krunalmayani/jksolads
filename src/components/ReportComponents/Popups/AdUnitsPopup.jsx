/** @format */

import React, { useContext, useState, useEffect } from 'react';
import { MdClose, MdSearch, MdCancel, MdExpandMore } from 'react-icons/md';
import { ReportContext } from '../../../context/ReportContext';

const AdUnitsPopup = ({ setTableNewData, filterPopupData, setPageNumber }) => {
  const { unitValue, setUnitValue, popupFlags, setPopupFlags } =
    useContext(ReportContext);

  const [allUnitData, setAllUnitData] = useState([]);
  const [searchAllUnitData, setSearchAllUnitData] = useState([]);
  const [checkedUnit, setCheckedUnit] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (filterPopupData?.all_app_list) {
      const initialData = filterPopupData.all_app_list.map((app) => {
        return {
          ...app,
          ad_units: app.ad_units.split(',').map((unit) => {
            const [unit_auto_id, unit_display_name] = unit.split('#');
            return {
              unit_auto_id,
              unit_display_name,
              unit_checked: false,
              app_name: app.app_display_name,
            };
          }),
        };
      });
      setAllUnitData(initialData);
      setSearchAllUnitData(initialData);
    }
  }, [filterPopupData]);

  useEffect(() => {
    const checkedUnits = allUnitData.flatMap((app) =>
      app?.ad_units.filter((unit) => unit.unit_checked)
    );
    setCheckedUnit(checkedUnits);
  }, [allUnitData, searchAllUnitData]);

  const handleCheckboxChange = (appIndex, unitIndex, unit_auto_id) => {
    const updatedUnitData = searchAllUnitData.map((app, index) => {
      if (index === appIndex) {
        const updatedUnits = app.ad_units.map((unit, idx) => {
          if (unit_auto_id === unit.unit_auto_id) {
            return {
              ...unit,
              unit_checked: !unit.unit_checked,
            };
          }
          return unit;
        });
        return {
          ...app,
          ad_units: updatedUnits,
        };
      }
      return app;
    });
    setSearchAllUnitData(updatedUnitData);

    const updatedAllData = allUnitData.map((item) => {
      if (item.app_auto_id === updatedUnitData[appIndex].app_auto_id) {
        return {
          ...item,
          ad_units: item.ad_units.map((unit, idx) => {
            if (unit_auto_id === unit.unit_auto_id) {
              return {
                ...unit,
                unit_checked: !unit.unit_checked,
              };
            }
            return unit;
          }),
        };
      }
      return item;
    });
    setAllUnitData(updatedAllData);
  };

  const handleClose = (unit) => {
    const updatedUnitData = allUnitData.map((app) => {
      const updatedApp = { ...app };
      const updatedUnits = updatedApp.ad_units.map((u) => {
        if (u.unit_auto_id === unit.unit_auto_id) {
          return { ...u, unit_checked: !u.unit_checked };
        }
        return u;
      });
      updatedApp.ad_units = updatedUnits;
      return updatedApp;
    });

    setAllUnitData(updatedUnitData);
    setSearchAllUnitData(updatedUnitData);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
    const filteredData = allUnitData.map((app) => ({
      ...app,
      ad_units: app.ad_units.filter(
        (unit) =>
          unit.unit_display_name.toLowerCase().includes(searchText) ||
          unit.app_name.toLowerCase().includes(searchText)
      ),
    }));
    setSearchAllUnitData(filteredData);
  };

  const handleClear = () => {
    setSearchText('');
    const resetData = filterPopupData.all_app_list.map((app) => {
      return {
        ...app,
        ad_units: app.ad_units.split(',').map((unit) => {
          const [unit_auto_id, unit_display_name] = unit.split('#');
          return { unit_auto_id, unit_display_name, unit_checked: false };
        }),
      };
    });
    setAllUnitData(resetData);
    setSearchAllUnitData(resetData);
  };

  const handleApply = (e) => {
    e.preventDefault();
    setTableNewData([]);
    setPageNumber(1);
    setUnitValue(checkedUnit);
    setPopupFlags(!popupFlags);
  };

  return (
    <div className='check-wrapper'>
      <button className='toggle-next filter-btn active'>
        Unit: <span className='ellipsis'></span>
      </button>
      <a
        className={
          unitValue.length > 0
            ? 'add-filter filter-btn btn-active'
            : 'add-filter filter-btn'
        }
      >
        Ad Unit
        {unitValue.length > 0 && (
          <>
            <span className='selected-item'>
              :
              {unitValue
                ?.map((item) => {
                  return item?.unit_display_name;
                })
                ?.slice(0, 2)
                ?.map((item, index) => (
                  <span className='selected-item-value' key={index}>
                    {' '}
                    {item}{' '}
                  </span>
                ))}
              {unitValue.length > 2 && (
                <span>+{unitValue.length - 2} more </span>
              )}
            </span>
          </>
        )}
      </a>
      <div className='checkboxes full-and-multi-filter' id='Lorems'>
        <div className='filter-title-box'>
          <span className='predicate-field-label'>Ad Unit</span>
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
                  id='searchInput11'
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
                    setSearchAllUnitData(allUnitData);
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
                {searchAllUnitData?.length === 0 ? (
                  <div className='noResult'>
                    <p>No Result Found</p>
                  </div>
                ) : (
                  searchAllUnitData?.map((app, appIndex) => {
                    return (
                      app?.ad_units.length > 0 && (
                        <div
                          className={
                            searchText.length > 0
                              ? 'box-check select-dropdown active'
                              : 'box-check select-dropdown'
                          }
                          key={appIndex}
                        >
                          <label>
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
                          <a className='arrow-btn'>
                            <MdExpandMore className='material-icons' />
                          </a>
                          <div className='select-dropdown-box'>
                            {app.ad_units.map((item, unitIndex) => (
                              <div className='box-check' key={unitIndex}>
                                <label>
                                  <input
                                    type='checkbox'
                                    name={item?.unit_auto_id}
                                    value={item?.unit_display_name}
                                    className='ckkBox val'
                                    checked={item.unit_checked}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        appIndex,
                                        unitIndex,
                                        item?.unit_auto_id
                                      )
                                    }
                                  />
                                  <span className='search-title'>
                                    {item?.unit_display_name}
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    );
                  })
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
              {checkedUnit?.length > 0 &&
                checkedUnit?.map((item, index) => (
                  <div className='result-box' key={index}>
                    <span>
                      <span className='unit_app_name'>{item?.app_name}</span>
                      <span>{item?.unit_display_name}</span>
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

export default AdUnitsPopup;
