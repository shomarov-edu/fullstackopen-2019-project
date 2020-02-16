// centralized error object that derives from Node’s Error
class AppError extends Error {
  constructor(httpStatusCode, description) {
    super();
    this.httpStatusCode = httpStatusCode;
    this.description = description;
  }
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

module.exports = AppError;
