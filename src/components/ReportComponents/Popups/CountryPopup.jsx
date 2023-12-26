/** @format */
import React, { useContext, useEffect, useState } from 'react';
import { MdClose, MdSearch, MdCancel } from 'react-icons/md';
import { ReportContext } from '../../../context/ReportContext';

const CountryPopup = ({ setTableNewData, filterPopupData, setPageNumber }) => {
  const { countryValue, setCountryValue, setPopupFlags, popupFlags } =
    useContext(ReportContext);

  const [allCountryData, setAllCountryData] = useState([]);
  const [filteredCountryData, setFilteredCountryData] = useState([]);
  const [checkedCountry, setCheckedCountry] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (filterPopupData?.all_app_list) {
      const initialCountryData = filterPopupData.all_countries.map((v) => ({
        ...v,
        item_checked: false,
      }));
      setAllCountryData(initialCountryData);
      setFilteredCountryData(initialCountryData);
    }
  }, [filterPopupData]);

  useEffect(() => {
    setCheckedCountry(allCountryData.filter((item) => item.item_checked));
  }, [allCountryData, filteredCountryData]);

  const handleCheckboxChange = (country, index) => {
    const updatedFilteredData = filteredCountryData.map((item) =>
      item.country_name === country.country_name
        ? { ...item, item_checked: !item.item_checked }
        : item
    );
    setFilteredCountryData(updatedFilteredData);

    const updatedAllData = allCountryData.map((item) =>
      item.country_auto_id === updatedFilteredData[index].country_auto_id
        ? { ...updatedFilteredData[index] }
        : { ...item }
    );
    setAllCountryData(updatedAllData);
  };

  const handleApply = (e) => {
    e.preventDefault();
    setTableNewData([]);
    setPageNumber(1);
    setCountryValue(checkedCountry);
    setPopupFlags(!popupFlags);
  };

  const handleClose = (item) => {
    const updatedCountry = allCountryData.map((country) =>
      country.country_auto_id === item.country_auto_id
        ? { ...country, item_checked: !country.item_checked }
        : country
    );
    setAllCountryData(updatedCountry);
    setFilteredCountryData(updatedCountry);
  };

  const handleClear = () => {
    setSearchText('');
    const resetData = filterPopupData.all_countries.map((v) => ({
      ...v,
      item_checked: false,
    }));
    setAllCountryData(resetData);
    setFilteredCountryData(resetData);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    const updatedFilteredData = allCountryData.filter((item) =>
      item.country_name.toLowerCase().includes(searchText)
    );

    setFilteredCountryData(updatedFilteredData);
  };
  return (
    <div className='check-wrapper'>
      <button className='toggle-next filter-btn active'>
        Country: <span className='ellipsis'></span>
      </button>
      <a
        className={
          countryValue.length > 0
            ? 'add-filter filter-btn btn-active'
            : 'add-filter filter-btn'
        }
      >
        Country
        {countryValue.length > 0 && (
          <>
            <span className='selected-item'>
              :
              {countryValue
                ?.map((item) => {
                  return item?.country_name;
                })
                ?.slice(0, 2)
                ?.map((item, index) => (
                  <span className='selected-item-value' key={index}>
                    {' '}
                    {item}{' '}
                  </span>
                ))}
              {countryValue.length > 2 && (
                <span>+{countryValue.length - 2} more </span>
              )}
            </span>
          </>
        )}
      </a>
      <div className='checkboxes full-and-multi-filter' id='Lorems'>
        <div className='filter-title-box'>
          <span className='predicate-field-label'>Country</span>
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
                  id='searchInput2'
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
                    setFilteredCountryData(allCountryData);
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
                {filteredCountryData.length === 0 ? (
                  <div className='noResult'>
                    <p>No Result Found</p>
                  </div>
                ) : (
                  filteredCountryData?.map((country, index) => (
                    <div className='box-check' key={country?.country_auto_id}>
                      <label>
                        <input
                          type='checkbox'
                          name={country?.country_auto_id}
                          value={country?.country_name}
                          className='ckkBox val'
                          checked={country.item_checked}
                          onChange={() => handleCheckboxChange(country, index)}
                        />
                        <span>
                          <span className='search-title'>
                            {country?.country_name}
                          </span>
                        </span>
                      </label>
                    </div>
                  ))
                )}
                <div className='apply-btn-wrap text-right'>
                  <button type='submit' href='#' className='apply-btn '>
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
              {checkedCountry?.map((item, index) => (
                <div className='result-box' key={index}>
                  <span>
                    <span>{item?.country_name}</span>
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

export default CountryPopup;
