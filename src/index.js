const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/node-crud-app';

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${'http://localhost:'+PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`, { stack: error.stack });
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', { error: err.message, stack: err.stack });
  // Close server & exit process
  process.exit(1);
});