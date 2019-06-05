const express = require('express');
const connectDB = require('./config/db');
const { port } = require('./config/config');
const cors = require('cors');

const app = express();
app.use(cors());

// Connect to DB
connectDB();

// Init Middleware
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

const PORT = port || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
