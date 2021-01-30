const express = require('express');
const cors = require('cors');
const path = require('path');
const { getConversations } = require('./conversations/getConversations');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors(corsOptions));
app.use(express.json());

app.use(getConversations);

app.listen(3000, () => {
  console.log(`Listening on port: 3000`);
});
