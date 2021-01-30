const express = require('express');
const router = express.Router();

router.get('/conversations', (req, res) => {
  res.status(200).send({
    conversations: [
      {
        id: 1,
        lastMuation: 'last mutation applies to this conversation',
        text: 'Sweet extra potatos',
      },
      {
        id: 2,
        lastMuation: 'last mutation applies to this conversation',
        text: 'Have a tomator kid',
      },
      {
        id: 3,
        lastMuation: 'last mutation applies to this conversation',
        text: 'Mac and cheese all day',
      },
      {
        id: 4,
        lastMuation: 'last mutation applies to this conversation',
        text: 'Sweet Chili',
      },
    ],
  });
});

module.exports = {
  getConversations: router,
};
