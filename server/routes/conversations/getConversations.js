const express = require('express');
const db = require('../../db/pgConfig');
const ListNode = require('../../classes/ListNode');
const router = express.Router();

router.get('/conversations', (req, res) => {
  const q = `
    SELECT id, conversation FROM conversations;
  `;

  db.query(q, (err, result) => {
    if (err) throw new Error(err);

    const rows = result.rows
      .sort((a, b) => {
        const { conversationId: aConvoId, data: aData } = a.conversation;
        const { conversationId: bConvoId, data: bData } = b.conversation;
        return aConvoId - bConvoId || aData.index - bData.index;
      })
      .reduce((acc, cur) => {
        const { id, conversation } = cur;
        acc.push({ id, conversation });
        return acc;
      }, []);

    const getConversations = () => {
      let array = [];
      let conversationHistory = [];
      let lastRow = {};
      let lastList = {};
      let sentence = '';

      rows.forEach((row, index) => {
        const { conversation: lastRowConvo } = lastRow;
        const { conversation: rowConvo } = row;
        const { text } = rowConvo.data;
        if (lastRow && !lastRowConvo) {
          sentence = text;
          lastRow = row;
          lastList = new ListNode(row.id, null, sentence);

          if (rows.length === 1) {
            array.push(lastList);
            return;
          }

          conversationHistory.push(row);
        } else if (lastRowConvo.conversationId === rowConvo.conversationId) {
          sentence += text;
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
