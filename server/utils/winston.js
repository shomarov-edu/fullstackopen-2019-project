const winston = require('winston');
const appRoot = require('app-root-path');

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${appRoot}/logs/combined.log` })
  ]
});

module.exports = logger;
