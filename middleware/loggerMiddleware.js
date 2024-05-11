// middleware/loggerMiddleware.js

const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "combined.log" })],
});

const logRequest = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    timestamp: new Date(),
  });
  next();
};

module.exports = { logRequest };
