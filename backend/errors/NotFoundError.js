class NotFoundError extends Error {
  constructor(message = 'Ошибка. Запрашиваемый объект не найден...') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
