require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

// const allowedDomains = [
//   'https://lenkazion.nomoredomains.work',
//   'http://lenkazion.nomoredomains.work',
//   'http://localhost:3000',
// ];

// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   if (allowedDomains.includes(origin)) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', origin);
//     const { method } = req;
//     const DEFAULT_ALLOWED_METHODS = 'GET,PUT,PATCH,POST,DELETE';
//     if (method === 'OPTIONS') {
//       const requestHeaders = req.headers['access-control-request-headers'];
//       res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//       res.header('Access-Control-Allow-Headers', requestHeaders);
//     }
//   }
//   next();
// });
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^https?:\/\/(www.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/,
      ),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', routerUser);
app.use('/cards', routerCards);

app.use(errorLogger);

app.use('*', () => {
  throw new NotFoundError('Не найден endpoint');
});

app.use(errors());
app.use(errorHandler);
