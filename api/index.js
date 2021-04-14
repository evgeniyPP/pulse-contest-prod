const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const functions = require('./functions');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'client', 'build')));

app.post('/api/participants', async (req, res) => {
  try {
    const url = req.body.url;
    functions.getParticipants(url).then(participants => {
      if (!participants) {
        res.status(422).send('Incorrect Url');
      }
      res.json(participants);
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Ошибка сервера, попробуйте снова', error: e });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}...`)
);
