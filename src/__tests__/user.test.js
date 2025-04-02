// Update src/__tests__/user.test.js
const mongoose = require('mongoose');
const User = require('../models/user');
const { setupTestDB, clearTestDB, closeTestDB } = require('./testSetup');

describe('User Model Test', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  it('should create & save user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      age: 25
    };
    
    const user = new User(userData);
    const savedUser = await user.save();
    
    // Object Id should be defined when successfully saved to MongoDB
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.age).toBe(userData.age);
    expect(savedUser.createdAt).toBeDefined();
  });

  // Validation tests
  it('should not save user with missing required fields', async () => {
    const userWithoutRequiredField = new User({ name: 'Test User' });
    
    let error;
    try {
      await userWithoutRequiredField.save();
    } catch (err) {
      error = err;
    }
    
    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });

  it('should not save user with invalid age', async () => {
    const userWithInvalidAge = new User({
      name: 'Test User',
      email: 'test@example.com',
      age: -5
    });
    
    let error;
    try {
      await userWithInvalidAge.save();
    } catch (err) {
      error = err;
    }
    
    expect(error).toBeDefined();
    expect(error.errors.age).toBeDefined();
  });
});