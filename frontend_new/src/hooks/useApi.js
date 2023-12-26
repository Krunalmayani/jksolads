/** @format */

import axios from 'axios';
import { SERVER_BASE_URL } from '../utils/helper';

const useApi = async (endpoint, response) => {
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
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export default useApi;
