const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const keys = require('./config/keys');
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

mongoose
  .connect(keys.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000
  })
  .then(result => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT);
    // const io = require('./services/socket').init(server);
    // io.on('connection', socket => {
    //   console.log('Client connected');
    // });
  })
  .catch(err => console.log(err));
