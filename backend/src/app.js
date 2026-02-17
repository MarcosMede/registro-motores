const express = require('express');
const cors = require('cors');
const motorRoutes = require('./routes/motorRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(
  cors({
    origin: '*'
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/motores', motorRoutes);

app.use(errorHandler);

module.exports = app;
