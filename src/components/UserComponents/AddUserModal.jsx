/** @format */

import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from '../../context/DataContext';
import useUserApi from '../../hooks/useUserApi';
import { useFormik } from 'formik';
import { AddUserSchema } from '../../schemas/UserSchema';
import Select from 'react-select';

const AddUserModal = (props) => {
  const { addUserFlag, setAddUserFlag, setModalShow } = useContext(DataContext);
  const [addUserErrorMassage, setAddUserErrorMassage] = useState('');

  const handleAddUser = async (values) => {
    const formData = new FormData();
    formData.append('user_id', localStorage.getItem('id'));
    formData.append('user_token', localStorage.getItem('token'));
    formData.append('user_name', values.name);
    formData.append('user_email', values.email);
    formData.append('user_password', values.password);
    formData.append('user_role', values.role);
    const response = await useUserApi('add-user', formData);

    if (response.status_code == 1) {
      setAddUserFlag(!addUserFlag);
      setModalShow(false);
    }
    if (response.status_code !== 1) {
      setAddUserErrorMassage(response?.msg);
    }
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    resetForm,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
    validationSchema: AddUserSchema,
    onSubmit: (values, action) => {
      handleAddUser(values);
      action.resetForm();
    },
  });
  const handleCancel = () => {
    setModalShow(false);
    resetForm();
  };

  const roleOptions = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'User' },
  ];

  return (
    <Modal
      {...props}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='modal fade basic-modal-wrap popup-modal-wrap'
    >
      <Modal.Body>
        <div className='form-wrap modal-form'>
          <h3>Set up a new User</h3>
          {addUserErrorMassage ? (
            <div className='backError'>{addUserErrorMassage} !!</div>
          ) : null}
          <form onSubmit={handleSubmit} noValidate>
            <div className='input-box'>
              <input
                type='text'
                className='input'
                name='name'
                value={values.name}
                onChange={handleChange}
              />
              <div className='input-label snByac'>
                <span>User name</span>
              </div>
              <div className='input-border'></div>
              <div className='blue-border'></div>
            </div>
            {touched.name && errors.name && (
              <div className='formErrors'>{errors.name}</div>
            )}
            <div className='input-box'>
              <input
                type='text'
                className='input'
                name='email'
                value={values.email}
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
                type='text'
                className='input'
                name='password'
                value={values.password}
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
            <div className='input-box react-select'>
              <Select
                placeholder={
                  <div className='select-placeholder'>Role selection</div>
                }
                value={values?.roleOptions?.value}
                options={roleOptions}
                onChange={(option) => setFieldValue('role', option.value)}
              />
            </div>
            {touched.role && errors.role && (
              <div className='formErrors'>{errors.role}</div>
            )}
            <button
              type='submit'
              className='mt-3 d-content-btn bg-btn float-right'
            >
              Save
            </button>
            <button
              type='button'
              className='mt-3 d-content-btn float-right'
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
