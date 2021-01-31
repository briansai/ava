const express = require('express');
const cors = require('cors');
const path = require('path');
const { getConversations } = require('./routes/conversations/getConversations');
const { postMutation } = require('./routes/mutations/postMutation');
const db = require('./db/pgConfig');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(getConversations);
app.use(postMutation);

db.connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
