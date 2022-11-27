class AuthError extends Error {
  constructor(message = 'Ошибка. Аутентификация не пройдена') {
    super(message);
    this.name = 'AuthError';
    this.statusCode = 401;
  }
}

module.exports = AuthError;
