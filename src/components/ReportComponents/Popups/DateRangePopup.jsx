/** @format */

import React, { useContext, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { DataContext } from '../../../context/DataContext';
import { ReportContext } from '../../../context/ReportContext';
import { addDays, isSameDay } from 'date-fns';
import { DateRangePicker, defaultStaticRanges } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect } from 'react';

const DateRangePopup = ({
  selectedStartDate,
  selectedEndDate,
  setPageNumber,
}) => {
  const { setDateRange } = useContext(DataContext);
  const { popupFlags, setPopupFlags } = useContext(ReportContext);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  useEffect(() => {
    setDateRange(selectedDateRange);
    setPopupFlags(!popupFlags);
  }, []);
  const handleSelect = (ranges) => {
    setSelectedDateRange([ranges.selection]);
  };
  const handleApplyButton = () => {
    setPageNumber(1);
    setDateRange(selectedDateRange);
    setPopupFlags(!popupFlags);
  };

  return (
    <div className='check-wrapper'>
      <button id='reportrange' className='toggle-next filter-btn active'>
        Date range: <span className='ellipsis'></span>
      </button>
      <a className='add-filter filter-btn btn-active'>
        Date range:
        <span> {`${selectedStartDate}-${selectedEndDate}`}</span>
      </a>
      <div
        className='checkboxes full-and-multi-filter custom-date-picker'
        id='Lorems'
      >
        <div className='filter-title-box'>
          <span className='predicate-field-label'>Date range:</span>
          <a className='close-filter'>
            <MdClose className='material-icons' />
          </a>
        </div>
        <div className='check-boxes-inner'>
          <div className='all-select-row'>
            <DateRangePicker
              onChange={handleSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={selectedDateRange}
              direction='horizontal'
              staticRanges={[
                ...defaultStaticRanges,
                {
                  label: 'Last 7 days',
                  range: () => ({
                    startDate: addDays(new Date(), -7),
                    endDate: new Date(),
                  }),
                  isSelected(range) {
                    const definedRange = this.range();
                    return (
                      isSameDay(range.startDate, definedRange.startDate) &&
                      isSameDay(range.endDate, definedRange.endDate)
                    );
                  },
                },
              ]}
            />
          </div>
        </div>
        <div className='apply-btn-wrap text-right'>
          <button href='#' className='apply-btn' onClick={handleApplyButton}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePopup;
