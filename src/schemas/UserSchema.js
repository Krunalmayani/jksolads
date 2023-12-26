/** @format */

import * as Yup from 'yup';

export const LoginUserSchema = Yup.object({
  email: Yup.string().email().required('Please enter Email'),
  password: Yup.string().min(4).max(15).required('Please enter Password'),
});

export const AddUserSchema = Yup.object({
  name: Yup.string().min(1).max(40).required('Please enter Name'),
  email: Yup.string().email().required('Please enter Email'),
  password: Yup.string().min(4).max(15).required('Please enter Password'),
  role: Yup.string().required('Please select user role'),
});

export const UpdateUserSchema = Yup.object({
  name: Yup.string().min(1).max(40).required('Please enter Name'),
  email: Yup.string().email().required('Please enter Email'),
  role: Yup.string().required('Please select user role'),
});

export const PermissionSchema = Yup.object({
  userSelectOptions: Yup.string().required('Please select User'),
  appSelectOptions: Yup.string().required('Please select Application'),
  multiSelectOptions: Yup.array().min(1, 'Please select Ad Id'),
});

export const CronSchema = Yup.object({
  minuteOptions: Yup.string().required('Please select Minute'),
  hourOptions: Yup.string().required('Please select Hour'),
  dayOptions: Yup.string().required('Please select Day'),
  monthOptions: Yup.string().required('Please select Month'),
  weekOptions: Yup.string().required('Please select Week'),
  commandValue: Yup.string().required('Please add Command'),
});
