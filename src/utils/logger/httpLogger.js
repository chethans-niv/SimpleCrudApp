const morgan = require('morgan');
const logger = require('./index');

// Custom token for request body
morgan.token('body', (req) => {
  // Don't log body for GET and DELETE requests
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    // Mask sensitive data like passwords
    const body = { ...req.body };
    if (body.password) body.password = '********';
    if (body.token) body.token = '********';
    return JSON.stringify(body);
  }
  return '';
});

// Create custom morgan format
const httpLogFormat = ':method :url :status :response-time ms - :res[content-length] :body';

// Create middleware
const httpLogger = morgan(httpLogFormat, {
  stream: logger.stream
});

module.exports = httpLogger;