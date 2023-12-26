/** @format */

import { createContext, useEffect, useState } from 'react';

// Create a context object
export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [addUserFlag, setAddUserFlag] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [addAccFlag, setAddAccFlag] = useState(false);
  const [accModalShow, setAccModalShow] = useState(false);
  const [accUpdateModalShow, setAccUpdateModalShow] = useState(false);
  const [editAccData, setEditAccData] = useState({});
  const [addAppFlag, setAddAppFlag] = useState(false);
  const [auth, setAuth] = useState(false);
  const [dateRange, setDateRange] = useState('');
  const [addPermissionFlag, setAddPermissionFlag] = useState(false);
  const [roleFlag, setRoleFlag] = useState(false);
  const [role, setRole] = useState('');

  const [cronFlag, setCronFlag] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, [roleFlag]);

  return (
    <DataContext.Provider
      value={{
        sidebarActive,
        setSidebarActive,
        addUserFlag,
        setAddUserFlag,
        userId,
        setUserId,
        userToken,
        setUserToken,
        modalShow,
        setModalShow,
        updateModalShow,
        setUpdateModalShow,
        editUserData,
        setEditUserData,
        accModalShow,
        setAccModalShow,
        addAccFlag,
        setAddAccFlag,
        accUpdateModalShow,
        setAccUpdateModalShow,
        editAccData,
        setEditAccData,
        addAppFlag,
        setAddAppFlag,
        auth,
        setAuth,
        dateRange,
        setDateRange,
        addPermissionFlag,
        setAddPermissionFlag,
        roleFlag,
        setRoleFlag,
        role,
        cronFlag,
        setCronFlag,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
