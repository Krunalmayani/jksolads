/** @format */

import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from '../../context/DataContext';
import { useFormik } from 'formik';
import { CronSchema } from '../../schemas/UserSchema';
import Select from 'react-select';
import {
  commonOptions,
  minuteOptions,
  hourOptions,
  dayOptions,
  monthOptions,
  weekOptions,
} from '../../utils/helper';
import useApi from '../../hooks/useApi';

const UpdateCronModal = (props) => {
  const { cronFlag, setCronFlag } = useContext(DataContext);
  const [updateCronError, setUpdateCronError] = useState('');

  const handleUpdateCron = async (values) => {
    const updateFormData = new FormData();
    updateFormData.append('user_id', localStorage.getItem('id'));
    updateFormData.append('user_token', localStorage.getItem('token'));
    updateFormData.append('cron_auto_id', props?.editdata?.cron_auto_id);
    updateFormData.append('cron_minute', values.minuteOptions);
    updateFormData.append('cron_hour', values.hourOptions);
    updateFormData.append('cron_day', values.dayOptions);
    updateFormData.append('cron_month', values.monthOptions);
    updateFormData.append('cron_weekday', values.weekOptions);
    updateFormData.append('cron_command', values.commandValue);
    const response = await useApi('update-cron', updateFormData);
    if (response?.data?.status_code == 1) {
      props.onHide();
      setCronFlag(!cronFlag);
    }
    if (response?.data?.status_code !== 1) {
      setUpdateCronError(response?.msg);
    }
  };
  const commonOptionInitial = `${props?.editdata?.cron_minute} ${props?.editdata?.cron_hour} ${props?.editdata?.cron_day} ${props?.editdata?.cron_month} ${props?.editdata?.cron_weekday}`;
  const editInitialValues = {
    commonOptions: commonOptionInitial || '',
    minuteOptions: props?.editdata?.cron_minute || '',
    hourOptions: props?.editdata?.cron_hour || '',
    dayOptions: props?.editdata?.cron_day || '',
    monthOptions: props?.editdata?.cron_month || '',
    weekOptions: props?.editdata?.cron_weekday || '',
    commandValue: props?.editdata?.cron_command?.split(' ')[1] || '',
  };
  const {
    values,
    errors,
    touched,
    resetForm,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: editInitialValues,
    validationSchema: CronSchema,
    onSubmit: (values) => {
      handleUpdateCron(values);
    },
  });
  const handleCancel = () => {
    props.onHide();
    resetForm();
  };
  const handleFieldValues = (selectedValue) => {
    const [minute, hour, day, month, week] = selectedValue.split(' ');
    setFieldValue('commonOptions', selectedValue);
    setFieldValue('minuteOptions', minute);
    setFieldValue('hourOptions', hour);
    setFieldValue('dayOptions', day);
    setFieldValue('monthOptions', month);
    setFieldValue('weekOptions', week);
  };
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='modal fade basic-modal-wrap popup-modal-wrap'
    >
      <Modal.Body>
        <div className='form-wrap modal-form'>
          <h3>Update Cron Job</h3>
          {updateCronError ? (
            <div className='backError cronError'>{updateCronError}</div>
          ) : null}
          <form onSubmit={handleSubmit} noValidate>
            <div className='cron-input-wrap'>
              <label>Common Settings:</label>
              <div className='cron-input'>
                <Select
                  placeholder={
                    <div className='select-placeholder'>Once Per Minute(*)</div>
                  }
                  value={commonOptions.find(
                    (option) => option.value === values.commonOptions
                  )}
                  name='commonOptions'
                  options={commonOptions}
                  onChange={(selectedOption) => {
                    handleFieldValues(selectedOption.value);
                  }}
                  className='cron-react-select'
                />
              </div>
            </div>
            <div className='cron-input-wrap'>
              <label>Minute:</label>
              <div className='cron-input'>
                <div className='input-box '>
                  <input
                    type='text'
                    className='input'
                    placeholder='*'
                    name='minuteOptions'
                    value={values.minuteOptions}
                    onChange={(e) => {
                      setFieldValue('minuteOptions', e.target.value);
                    }}
                  />
                  <div className='input-border'></div>
                </div>
                <Select
                  placeholder={
                    <div className='select-placeholder'>Once Per Minute(*)</div>
                  }
                  value={minuteOptions.find(
                    (option) => option.value === values.minuteOptions
                  )}
                  name='minuteOptions'
                  options={minuteOptions}
                  onChange={(selectedOption) => {
                    setFieldValue('minuteOptions', selectedOption.value);
                  }}
                  className='cron-react-select'
                />
              </div>
              {touched.minuteOptions && errors.minuteOptions && (
                <div className='formErrors'>{errors.minuteOptions}</div>
              )}
            </div>
            <div className='cron-input-wrap'>
              <label>Hour:</label>
              <div className='cron-input'>
                <div className='input-box '>
                  <input
                    type='text'
                    className='input'
                    placeholder='*'
                    name='hourOptions'
                    value={values.hourOptions}
                    onChange={(e) => {
                      setFieldValue('hourOptions', e.target.value);
                    }}
                  />
                  <div className='input-border'></div>
                </div>
                <Select
                  placeholder={
                    <div className='select-placeholder'>Every Hour(*)</div>
                  }
                  value={hourOptions.find(
                    (option) => option.value === values.hourOptions
                  )}
                  name='hourOptions'
                  options={hourOptions}
                  onChange={(selectedOption) => {
                    setFieldValue('hourOptions', selectedOption.value);
                  }}
                  className='cron-react-select'
                />
              </div>
              {touched.hourOptions && errors.hourOptions && (
                <div className='formErrors'>{errors.hourOptions}</div>
              )}
            </div>
            <div className='cron-input-wrap'>
              <label>Day:</label>
              <div className='cron-input'>
                <div className='input-box '>
                  <input
                    type='text'
                    className='input'
                    placeholder='*'
                    name='dayOptions'
                    value={values.dayOptions}
                    onChange={(e) => {
                      setFieldValue('dayOptions', e.target.value);
                    }}
                  />
                  <div className='input-border'></div>
                </div>
                <Select
                  placeholder={<div className='select-placeholder'>Day</div>}
                  value={dayOptions.find(
                    (option) => option.value === values.dayOptions
                  )}
                  name='dayOptions'
                  options={dayOptions}
                  onChange={(selectedOption) => {
                    setFieldValue('dayOptions', selectedOption.value);
                  }}
                  className='cron-react-select'
                />
              </div>
              {touched.dayOptions && errors.dayOptions && (
                <div className='formErrors'>{errors.dayOptions}</div>
              )}
            </div>
            <div className='cron-input-wrap'>
              <label>Month:</label>
              <div className='cron-input'>
                <div className='input-box '>
                  <input
                    type='text'
                    className='input'
                    placeholder='*'
                    name='monthOptions'
                    value={values.monthOptions}
                    onChange={(e) => {
                      setFieldValue('monthOptions', e.target.value);
                    }}
                  />
                  <div className='input-border'></div>
                </div>
                <Select
                  placeholder={<div className='select-placeholder'>Month</div>}
                  value={monthOptions.find(
                    (option) => option.value === values.monthOptions
                  )}
                  name='monthOptions'
                  options={monthOptions}
                  onChange={(selectedOption) => {
                    setFieldValue('monthOptions', selectedOption.value);
                  }}
                  className='cron-react-select'
                />
              </div>
              {touched.monthOptions && errors.monthOptions && (
                <div className='formErrors'>{errors.monthOptions}</div>
              )}
            </div>
            <div className='cron-input-wrap'>
              <label>WeekDay:</label>
              <div className='cron-input'>
                <div className='input-box '>
                  <input
                    type='text'
                    className='input'
                    placeholder='*'
                    name='monthOptions'
                    value={values.weekOptions}
                    onChange={(e) => {
                      setFieldValue('weekOptions', e.target.value);
                    }}
                  />
                  <div className='input-border'></div>
                </div>
                <Select
                  placeholder={<div className='select-placeholder'>Month</div>}
                  value={weekOptions.find(
                    (option) => option.value === values.weekOptions
                  )}
                  name='weekOptions'
                  options={weekOptions}
                  onChange={(selectedOption) => {
                    setFieldValue('weekOptions', selectedOption.value);
                  }}
                  className='cron-react-select'
                />
              </div>
              {touched.weekOptions && errors.weekOptions && (
                <div className='formErrors'>{errors.weekOptions}</div>
              )}
            </div>
            <div className='cron-input-wrap'>
              <label>Command:</label>
              <div className='cron-input'>
                <div className='input-box '>
                  <input
                    type='text'
                    className='input'
                    name='commandValue'
                    value={values.commandValue}
                    onChange={handleChange}
                  />
                  <div className='input-border'></div>
                </div>
              </div>
              {touched.commandValue && errors.commandValue && (
                <div className='formErrors'>{errors.commandValue}</div>
              )}
            </div>
            <button
              type='submit'
              className='mt-4 d-content-btn bg-btn float-right'
            >
              Update
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

export default UpdateCronModal;
