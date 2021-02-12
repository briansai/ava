import axios from 'axios';

export const postMutation = (data) => {
  return axios.post('/mutations', data).then((res) => res.data);
};
