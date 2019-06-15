const express = require('express');
const winston = require('winston');
const app = express();
const cors = require('cors');

app.use(cors());

require('./startup/logging')();
require('./startup/db')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/validation')();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  winston.info(`Listening on port ${PORT}`);
});

module.exports = server;
