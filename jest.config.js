// Update jest.config.js to use proper setup
module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.js'],
    verbose: true,
    // Remove the globals setting as we're now handling the DB connection directly in our test files
  };