const winston = require('winston');
const appRoot = require('app-root-path');

module.exports = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
    // new winston.transports.File({ filename: `${appRoot}/logs/combined.log` })
  ]
});
