const express = require('express');
const cors = require('cors');
const path = require('path');
const { getConversations } = require('./conversations/getConversations');
const { postMutation } = require('./mutations/postMutation');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(getConversations);
app.use(postMutation);

app.listen(3000, () => {
  console.log(`Listening on port: 3000`);
});
