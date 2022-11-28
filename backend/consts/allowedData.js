const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://nedvov.mesto.nomoredomains.club',
  'https://nedvov.mesto.nomoredomains.club',
];

module.exports = {
  allowedMethods,
  allowedCors,
};
