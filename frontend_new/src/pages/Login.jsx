/** @format */

import React, { useContext, useRef, useState } from 'react';
import { ReactComponent as GoogleIcon } from '../assets/images/google-icon.svg';
import useUserApi from '../hooks/useUserApi';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { LoginUserSchema } from '../schemas/UserSchema';
import { DataContext } from '../context/DataContext';
import { Helmet } from 'react-helmet-async';
import Profile from '../assets/images/login-icon.png';

const Login = () => {
  const [errorMassage, setErrorMassage] = useState('');
  const { setAuth, roleFlag, setRoleFlag } = useContext(DataContext);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleLoginUser = async (values, action) => {
    const formData = new FormData();
    formData.append('user_email', values.email);
    formData.append('user_password', values.password);

    const response = await useUserApi('web-login', formData);
    if (response?.status_code === 1) {
      localStorage.setItem('id', response?.info?.user_id);
      localStorage.setItem('token', response?.info?.user_token);
      localStorage.setItem('name', response?.info?.user_name);
      localStorage.setItem('email', response?.info?.user_email);
      localStorage.setItem('role', response?.info?.user_role);
      setRoleFlag(!roleFlag);
    }
    if (response?.status_code === 0) {
      setErrorMassage(response?.msg.split('</b>')[1]);
    }
    if (localStorage.getItem('token')) {
      setAuth(true);
      navigate('/');
    }
    if (response?.status_code === 1) {
      action.resetForm();
    }
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginUserSchema,
    onSubmit: (values, action) => {
      handleLoginUser(values, action);
    },
  });

  //Redirect Page to home
  if (window.location.pathname === '/login' && localStorage.getItem('token')) {
    window.location.href = '/';
  }

  return (
    <section>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className='login-wrapper'>
        <div className='login-box'>
          <div className='logo login-logo'>
            <img src={Profile} />
          </div>
          <h1 className='title-text'>Login</h1>
          <div className='sub-text'> to continue to JKSOL Ads</div>
          {errorMassage ? (
            <div className='backError'>{errorMassage}</div>
          ) : null}
          <div className='form-wrap modal-form'>
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className='input-box'>
                <input
                  type='email'
                  value={values.email}
                  className='input'
                  name='email'
                  onChange={handleChange}
                />
                <div className='input-label snByac'>
                  <span>Email</span>
                </div>
                <div className='input-border'></div>
                <div className='blue-border'></div>
              </div>
              {touched.email && errors.email && (
                <div className='formErrors'>{errors.email}</div>
              )}
              <div className='input-box'>
                <input
                  type='password'
                  value={values.password}
                  className='input'
                  name='password'
                  onChange={handleChange}
                />
                <div className='input-label snByac'>
                  <span>Password</span>
                </div>
                <div className='input-border'></div>
                <div className='blue-border'></div>
              </div>
              {touched.password && errors.password && (
                <div className='formErrors'>{errors.password}</div>
              )}
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
