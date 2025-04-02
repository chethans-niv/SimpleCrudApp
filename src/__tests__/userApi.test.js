const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const { setupTestDB, clearTestDB, closeTestDB } = require('./testSetup');

describe('User API Test', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  // Test user creation
  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    // Check response
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
    expect(response.body.age).toBe(userData.age);
    expect(response.body._id).toBeDefined();

    // Verify user is in database
    const user = await User.findById(response.body._id);
    expect(user).not.toBeNull();
    expect(user.name).toBe(userData.name);
  });

  // Test getting all users
  it('should get all users', async () => {
    // Create test users
    await User.create([
      { name: 'User 1', email: 'user1@example.com', age: 25 },
      { name: 'User 2', email: 'user2@example.com', age: 30 }
    ]);

    const response = await request(app)
      .get('/api/users')
      .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBeDefined();
    expect(response.body[1].name).toBeDefined();
  });

  // Test getting a user by ID
  it('should get a user by ID', async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      age: 40
    });

    const response = await request(app)
      .get(`/api/users/${user._id}`)
      .expect(200);

    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
  });

  // Test updating a user
  it('should update a user', async () => {
    const user = await User.create({
      name: 'Original Name',
      email: 'original@example.com',
      age: 35
    });

    const updatedData = {
      name: 'Updated Name',
      age: 36
    };

    const response = await request(app)
      .patch(`/api/users/${user._id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.age).toBe(updatedData.age);
    expect(response.body.email).toBe(user.email); // Email shouldn't change

    // Verify user is updated in database
    const updatedUser = await User.findById(user._id);
    expect(updatedUser.name).toBe(updatedData.name);
  });

  // Test deleting a user
  it('should delete a user', async () => {
    const user = await User.create({
      name: 'Delete Me',
      email: 'delete@example.com',
      age: 50
    });

    await request(app)
      .delete(`/api/users/${user._id}`)
      .expect(200);

    // Verify user is deleted from database
    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});