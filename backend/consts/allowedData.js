const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

module.exports = {
  allowedMethods,
  allowedCors,
};
