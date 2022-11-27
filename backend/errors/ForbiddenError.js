class ForbiddenError extends Error {
  constructor(message = 'Ошибка. Действие запрещено') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
