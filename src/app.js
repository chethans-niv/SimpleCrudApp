const express = require('express');
const logger = require('./utils/logger');
const httpLogger = require('./utils/logger/httpLogger');
const userRoutes = require('./routes/userRoutes');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// HTTP request logging
app.use(httpLogger);

// Routes
app.use('/api', userRoutes);

// Health check route
app.get('/health', (req, res) => {
  logger.debug('Health check endpoint called');
  res.status(200).send({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { 
    stack: err.stack,
    method: req.method,
    url: req.originalUrl
  });
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

// 404 handler
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: { message: 'Route not found' } });
});

// Export app for testing
module.exports = app;