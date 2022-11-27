const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { handleErrors } = require('./utils/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors({ message: 'Ошибка. Переданы некорректные данные' }));

app.use(handleErrors);

mongoose.connect('mongodb://localhost:27017/mestodb', {});

module.exports = app;
