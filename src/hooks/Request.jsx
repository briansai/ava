import { useState } from 'react';
import axios from 'axios';

const Request = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);
  const doRequest = async (props = {}) => {
    try {
      setErrors(null);

      const response = await axios[method](url, { ...body, ...props });

      onSuccess && onSuccess(response.data);

      return response.data;
    } catch (error) {
      setErrors(error);
    }
  };

  return { doRequest, errors };
};

export default Request;
