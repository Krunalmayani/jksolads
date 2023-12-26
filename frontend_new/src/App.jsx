/** @format */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Accounts from './pages/Accounts';
// import AdUnits from './pages/AdUnits';
import AppDetails from './pages/AppDetails';
import Apps from './pages/Apps';
// import AppSettings from './pages/AppSettings';
import Home from './pages/Home';
import Login from './pages/Login';
import Permission from './pages/Permission';
import Reports from './pages/Reports';
import PageNotFound from './pages/PageNotFound';
import User from './pages/User';
import { DataContext } from './context/DataContext';
import { useContext } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Cron from './pages/Cron';
import PolicyCenter from './pages/PolicyCenter';
import Settings from './pages/Settings';

function App() {
  const { role } = useContext(DataContext);
  return (
    <>
      <BrowserRouter>
        <HelmetProvider>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Home />} exact />
              {/* {role == 1 && <Route path='/users' element={<User />} />} */}
              {/* <Route path='/accounts' element={<Accounts />} /> */}
              <Route path='/apps' element={<Apps />} />
              <Route path='/app-details/:id' element={<AppDetails />} />
              <Route path='/reports' element={<Reports />} />
              {/* {role == 1 && (
                <Route path='/permission' element={<Permission />} />
              )} */}
              {role == 1 && <Route path='/cron' element={<Cron />} />}
              <Route path='/policy-center' element={<PolicyCenter />} />
              <Route path='/settings' element={<Settings />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
