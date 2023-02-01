class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // calls the constructor method of Error
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
