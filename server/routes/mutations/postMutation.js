const express = require('express');
const db = require('../../db/pgConfig');
const router = express.Router();

router.post('/mutations', (req, res) => {
  const q = `
    INSERT INTO conversations (conversation)
    VALUES ('${JSON.stringify(req.body)}')
  `;

  db.query(q, (err, result) => {
    if (err) {
      throw new Error(err);
    }

    res.status(200).send(result);
  });
});

module.exports = {
  postMutation: router,
};
