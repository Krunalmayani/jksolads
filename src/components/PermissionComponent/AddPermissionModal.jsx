/** @format */

import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from '../../context/DataContext';
import { useFormik } from 'formik';
import { PermissionSchema } from '../../schemas/UserSchema';
import { useState } from 'react';
import { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const AddPermissionModal = (props) => {
  const { addPermissionFlag, setAddPermissionFlag, setModalShow } =
    useContext(DataContext);

  const [allUsesList, setAllUsesList] = useState('');
  const [allAppsList, setAppsList] = useState('');
  const [adUnitList, setAdUnitList] = useState('');
  const [permissionList, setPermissionList] = useState([]);
  const animatedComponents = makeAnimated();

  let multiSelectOptions = {};
  let appSelectOptions = {};
  let userSelectOptions = {};

  if (adUnitList.length > 0) {
    multiSelectOptions = adUnitList?.map((options) => {
      return { value: options.au_auto_id, label: options.au_display_name };
    });
  }
  if (allAppsList.length > 0) {
    appSelectOptions = allAppsList?.map((options) => {
      return { value: options.app_auto_id, label: options.app_display_name };
    });
  }
  if (allUsesList.length > 0) {
    userSelectOptions = allUsesList?.map((options) => {
      return { value: options.user_id, label: options.user_name };
    });
  }

  const { values, errors, touched, setFieldValue, resetForm, handleSubmit } =
    useFormik({
      initialValues: {
        userSelectOptions: '',
        appSelectOptions: '',
        multiSelectOptions: [],
      },
      validationSchema: PermissionSchema,
      onSubmit: (values, action) => {
        handlePermissionData(values);
        action.resetForm();
      },
    });

  const handlePermissionData = async (values) => {
    setModalShow(false);
    resetForm();
    // Ad-units List
    const multiVal = values?.multiSelectOptions?.map((val) => {
      return val.value;
    });
    const permissionParams = JSON.stringify({
      user_id: localStorage.getItem('id'),
      user_token: localStorage.getItem('token'),
      user_unique_id: values?.userSelectOptions,
      permission_au_auto_id: multiVal,
    });
    const permissionFormData = new FormData();
    permissionFormData.append('json_data', permissionParams);
    const permissionResponse = await useApi(
      'add-user-permission',
      permissionFormData
    );
    setPermissionList(permissionResponse);
    setAddPermissionFlag(!addPermissionFlag);
  };

  const handleCancel = () => {
    setModalShow(false);
    resetForm();
  };

  const handleSelect = async () => {
    const selectListFormData = new FormData();
    selectListFormData.append('user_id', localStorage.getItem('id'));
    selectListFormData.append('user_token', localStorage.getItem('token'));

    //All User-List
    const userResponse = await useApi('get-all-users', selectListFormData);
    if (userResponse?.data?.status_code == 1) {
      setAllUsesList(userResponse?.data?.info);
    }

    //All Apps List
    const appsResponse = await useApi('list-all-apps', selectListFormData);
    setAppsList(appsResponse?.data?.info);
  };
  useEffect(() => {
    handleSelect();
  }, []);

  const handleAdUnit = async () => {
    // Ad-units List
    const adUnitFormData = new FormData();
    adUnitFormData.append('user_id', localStorage.getItem('id'));
    adUnitFormData.append('user_token', localStorage.getItem('token'));
    adUnitFormData.append('app_auto_id', values?.appSelectOptions || 1);
    const adUnitResponse = await useApi('list-ad-units', adUnitFormData);
    setAdUnitList(adUnitResponse?.data?.info);
  };
  useEffect(() => {
    handleAdUnit();
  }, [values?.appSelectOptions]);

  return (
    <Modal
      {...props}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      size={'lg'}
      className='modal fade basic-modal-wrap popup-modal-wrap'
    >
      <Modal.Body>
        <div className='form-wrap modal-form'>
          <h3>Add Permission</h3>
          <form
            onSubmit={handleSubmit}
            noValidate
            className='add-permission-form'
          >
            <div className='input-box react-select'>
              <Select
                placeholder={
                  <div className='select-placeholder'>Select User</div>
                }
                value={values?.userSelectOptions?.value}
                options={userSelectOptions}
                onChange={(option) =>
                  setFieldValue('userSelectOptions', option.value)
                }
              />
            </div>
            {touched.userSelectOptions && errors.userSelectOptions && (
              <div className='formErrors'>{errors.userSelectOptions}</div>
            )}

            <div className='input-box react-select'>
              <Select
                placeholder={
                  <div className='select-placeholder'>Select Application</div>
                }
                value={values?.appSelectOptions?.value}
                options={appSelectOptions}
                onChange={(option) =>
                  setFieldValue('appSelectOptions', option.value)
                }
              />
            </div>
            {touched.appSelectOptions && errors.appSelectOptions && (
              <div className='formErrors'>{errors.appSelectOptions}</div>
            )}

            <div className='input-box react-select'>
              <Select
                placeholder={
                  <div className='select-placeholder'>Select Ad ID</div>
                }
                value={values?.multiSelectOptions}
                isMulti={true}
                options={multiSelectOptions}
                components={animatedComponents}
                onChange={(option) =>
                  setFieldValue('multiSelectOptions', option)
                }
              />
            </div>
            {touched.multiSelectOptions && errors.multiSelectOptions && (
              <div className='formErrors'>{errors.multiSelectOptions}</div>
            )}

            <button
              type='submit'
              className='mt-4 d-content-btn bg-btn float-right'
            >
              Add
            </button>
            <button
              type='button'
              className='mt-4 d-content-btn float-right'
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

export default AddPermissionModal;
