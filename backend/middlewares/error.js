const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.message}`;
    err = new ErrorHandler(message, 404);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, 404);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, please try again`;
    err = new ErrorHandler(message, 404);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, please try again`;
    err = new ErrorHandler(message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
