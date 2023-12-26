/** @format */

import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from '../../context/DataContext';
import useUserApi from '../../hooks/useUserApi';
import { useFormik } from 'formik';
import { UpdateUserSchema } from '../../schemas/UserSchema';
import Select from 'react-select';

const UpdateUserModal = (props) => {
  const { addUserFlag, setAddUserFlag, setUpdateModalShow, editUserData } =
    useContext(DataContext);
  const [updateErrorMassage, setUpdateErrorMassage] = useState('');

  const handleUpdateUser = async (values) => {
    const updateData = new FormData();
    updateData.append('user_id', localStorage.getItem('id'));
    updateData.append('user_token', localStorage.getItem('token'));
    updateData.append('user_name', values.name);
    updateData.append('user_email', values.email);
    updateData.append('user_password', values.password);
    updateData.append('user_role', values.role);
    updateData.append('user_unique_id', editUserData.user_id);
    const response = await useUserApi('update-user', updateData);
    if (response.status_code == 1) {
      setUpdateModalShow(false);
      setAddUserFlag(!addUserFlag);
    }
    if (response.status_code !== 1) {
      setUpdateErrorMassage(response?.msg);
    }
  };

  const editInitialValues = {
    name: editUserData.user_name || '',
    email: editUserData.user_email || '',
    password: '',
    role: editUserData.user_role || '',
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
    enableReinitialize: true,
    initialValues: editInitialValues,
    validationSchema: UpdateUserSchema,
    onSubmit: (values) => {
      handleUpdateUser(values);
    },
  });

  const handleCancel = () => {
    setUpdateModalShow(false);
    resetForm();
  };

  const roleOptions = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'User' },
  ];

  return (
    <Modal
      {...props}
      size='xl-down'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='modal fade basic-modal-wrap popup-modal-wrap'
    >
      <Modal.Body>
        <div className='form-wrap modal-form'>
          <form onSubmit={handleSubmit} noValidate>
            <h3>Update User</h3>
            {updateErrorMassage ? (
              <div className='backError'>{updateErrorMassage}</div>
            ) : null}
            <div className='input-box'>
              <input
                type='text'
                className='input text-add'
                name='name'
                value={values?.name}
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
                className='input text-add'
                name='email'
                value={values?.email}
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
                type='Password'
                className='input'
                name='password'
                value={values?.password}
                onChange={handleChange}
              />
              <div className='input-label snByac'>
                <span>Password (optional)</span>
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
                value={roleOptions.find(
                  (option) => option.value === values.role
                )}
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
              Update
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

export default UpdateUserModal;
