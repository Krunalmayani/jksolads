/** @format */

import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { ReportContext } from '../../context/ReportContext';

const DimensionBox = ({ setPageNumber }) => {
  const { setDimensionValue, popupFlags, setPopupFlags } =
    useContext(ReportContext);

  //All Filter Popup Data
  const initialData = [
    {
      dimension_auto_id: '1',
      dimension_display_name: 'App',
      dimension_value: 'app_display_name',
      dimension_checked: true,
    },
    {
      dimension_auto_id: '2',
      dimension_display_name: 'Date',
      dimension_value: 'report_date',
      dimension_checked: false,
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
  const handleCheck = (item) => {
    const updatedDimensions = allDimensionData.map((dimension) => {
      if (
        dimension.dimension_auto_id === item.dimension_auto_id &&
        dimension.dimension_checked
      ) {
        return {
          ...dimension,
          dimension_checked: false,
        };
      } else if (dimension.dimension_auto_id === item.dimension_auto_id) {
        return {
          ...dimension,
          dimension_checked: true,
        };
      }
      {
        return {
          ...dimension,
        };
      }
    });
    setDimensionValue(
      allDimensionData.filter((item) => item.dimension_checked)
    );
    setAllDimensionData(updatedDimensions);
    setPageNumber(1);
  };
  useEffect(() => {
    setDimensionValue(
      allDimensionData.filter((item) => {
        return item.dimension_checked;
      })
    );
    setPopupFlags(!popupFlags);
  }, [allDimensionData]);

  return (
    <div className='dimension-box'>
      <div className='dimension-title'>Dimensions</div>
      <div className='dimension-value'>
        {allDimensionData.map((dimension, index) => (
          <div
            className={
              dimension?.dimension_checked
                ? 'dimension-name active'
                : 'dimension-name'
            }
            key={index}
            onClick={() => handleCheck(dimension)}
          >
            {dimension.dimension_display_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DimensionBox;
