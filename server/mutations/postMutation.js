const express = require('express');
const router = express.Router();

router.post('/mutations', (req, res) => {
  res.status(200).send({});
});

module.exports = {
  postMutation: router,
};
