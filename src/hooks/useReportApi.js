/** @format */

import axios from 'axios';
import { SERVER_BASE_URL } from '../utils/helper';

const useReportApi = async (endpoint, response) => {
  const headerConfig = {
    header: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
  };
  try {
    const result = await axios.post(
      `${SERVER_BASE_URL}${endpoint}`,
      response,
      headerConfig
    );
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default useReportApi;
