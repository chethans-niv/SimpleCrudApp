// Update src/__tests__/testSetup.js to skip testing
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Add this line to prevent Jest from treating this as a test file
// This tells Jest to skip this file when looking for tests
test.skip('skip', () => {});

let mongoServer;

module.exports = {
  setupTestDB: async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    return mongoUri;
  },
  
  clearTestDB: async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  },
  
  closeTestDB: async () => {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
  }
};