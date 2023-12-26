/** @format */

import { createContext, useState } from 'react';

// Create a context object
export const ReportContext = createContext();

export const ReportContextProvider = ({ children }) => {
  const [appValue, setAppValue] = useState([]);
  const [countryValue, setCountryValue] = useState([]);
  const [formatValue, setFormatValue] = useState([]);
  const [platformValue, setPlatformValue] = useState([]);
  const [dimensionValue, setDimensionValue] = useState([]);
  const [unitValue, setUnitValue] = useState([]);
  const [popupFlags, setPopupFlags] = useState(false);

  const [filterFlag, setFilterFlag] = useState(false);

  return (
    <ReportContext.Provider
      value={{
        appValue,
        setAppValue,
        countryValue,
        setCountryValue,
        formatValue,
        setFormatValue,
        platformValue,
        setPlatformValue,
        popupFlags,
        setPopupFlags,
        dimensionValue,
        setDimensionValue,
        unitValue,
        setUnitValue,
        filterFlag,
        setFilterFlag,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export default ReportContextProvider;
