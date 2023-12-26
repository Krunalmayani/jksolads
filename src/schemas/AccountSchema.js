/** @format */

import * as Yup from 'yup';

export const AddAccountSchema = Yup.object({
  email: Yup.string().email().required('Please enter Email'),
  publicId: Yup.string().min(1).required('Please enter Public Id'),
  accessToken: Yup.string().min(4).required('Please enter Access Token'),
});

export const UpdateAccountSchema = Yup.object({
  email: Yup.string().email().required('Please enter Email'),
  publicId: Yup.string().min(1).required('Please enter Public Id'),
  accessToken: Yup.string().min(4).required('Please enter Access Token'),
});
