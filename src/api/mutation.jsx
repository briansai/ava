import axios from 'axios';

function postMutation(data) {
  // return new Promise(function (resolve, reject) {
  axios.post('/mutations', data).then((res) => res.data);
  // .catch((err) => reject(err));
  // });
}

export function* postMutationGenerator(mutations) {
  for (const mutation of mutations) {
    yield postMutation(mutation);
  }
}
