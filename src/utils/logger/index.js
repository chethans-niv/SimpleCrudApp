const winston = require('winston');
const path = require('path');

// Define log formats
const formats = {
  console: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
  file: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  )
};

// Define log files
const logDir = path.join(process.cwd(), 'logs');

// Create the logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: formats.console
    }),
    // File transport - error logs
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: formats.file
    }),
    // File transport - combined logs
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: formats.file
    })
  ],
  // Don't exit on uncaught exceptions
  exitOnError: false
});

// Create a stream object for Morgan HTTP logger integration
logger.stream = {
  write: (message) => {
    // Remove trailing newline
    logger.info(message.trim());
  }
};

module.exports = logger;
