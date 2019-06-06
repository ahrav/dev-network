const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const { host, dbPort, db, port } = require('./config/config');
const cors = require('cors');

const app = express();
app.use(cors());

// Init Middleware

app.use(bodyParser.json());
app.use(
  express.json({
    extended: false
  })
);

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/users', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));
app.use('/profile', require('./routes/api/profile'));
app.use('/posts', require('./routes/api/posts'));

const url = `mongodb://${host}:${dbPort}/${db}`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000
  })
  .then(result => {
    app.listen(port);
    // const io = require('./services/socket').init(server);
    // io.on('connection', socket => {
    //   console.log('Client connected');
    // });
  })
  .catch(err => console.log(err));
