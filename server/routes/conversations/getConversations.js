const express = require('express');
const db = require('../../db/pgConfig');
const ListNode = require('../../classes/ListNode');
const sortData = require('../../utils/sortData');
const router = express.Router();

router.get('/conversations', (req, res) => {
  const q = `
    SELECT id, conversation FROM conversations;
  `;

  db.query(q, (err, result) => {
    if (err) throw new Error(err);

    const rows = sortData(result);

    const getConversations = () => {
      let array = [];
      let conversationHistory = [];
      let lastRow = {};
      let lastList = {};
      let sentence = '';

      rows.forEach((row, index) => {
        const { conversation: lastRowConvo } = lastRow;
        const { conversation: rowConvo } = row;
        const { text, type, index: idx, length } = rowConvo.data;
        if (lastRow && !lastRowConvo) {
          sentence = text;
          lastRow = row;
          lastList = new ListNode(row.id, [row], sentence);
          if (rows.length === 1) {
            array.push(lastList);
            return;
          }

          conversationHistory.push(row);
        } else if (lastRowConvo.conversationId === rowConvo.conversationId) {
          if (type === 'delete') {
            sentence =
              sentence.substring(0, idx) + sentence.substring(idx + length);
          } else {
            sentence += text;
          }

          lastRow = row;
          conversationHistory.push(row);
          lastList = new ListNode(row.id, conversationHistory, sentence);

          if (index === rows.length - 1) {
            array.push(lastList);
          }
        } else if (lastRowConvo.conversationId !== rowConvo.conversationId) {
          array.push(lastList);
          conversationHistory = [];
          sentence = text;
          lastRow = row;
          conversationHistory.push(row);
          lastList = new ListNode(row.id, null, sentence);

          if (index === rows.length - 1) {
            array.push(lastList);
          }
        }
      });

      return array;
    };

    res.status(200).send({
      conversations: getConversations(),
      ok: true,
      msg: 'Success',
    });
  });
});

module.exports = {
  getConversations: router,
};
