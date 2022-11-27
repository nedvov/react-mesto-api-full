class UniqueError extends Error {
  constructor(message = 'Ошибка. Нельзя создавать неуникальные сущности') {
    super(message);
    this.name = 'UniqueError';
    this.statusCode = 409;
  }
}

module.exports = UniqueError;
