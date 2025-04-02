const User = require('../models/user');
const logger = require('../utils/logger');

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    logger.info('Creating new user', { data: { ...req.body, email: req.body.email } });
    const user = new User(req.body);
    await user.save();
    logger.info('User created successfully', { userId: user._id });
    res.status(201).send(user);
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`, { 
      stack: error.stack,
      data: req.body 
    });
    next(error);
  }
};

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    logger.info('Fetching all users');
    const users = await User.find({});
    logger.info(`Found ${users.length} users`);
    res.status(200).send(users);
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    logger.info(`Fetching user by ID: ${userId}`);
    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`User not found with ID: ${userId}`);
      return res.status(404).send({ error: 'User not found' });
    }
    logger.info(`User found: ${userId}`);
    res.status(200).send(user);
  } catch (error) {
    logger.error(`Error fetching user by ID: ${error.message}`, { 
      stack: error.stack,
      userId: req.params.id 
    });
    next(error);
  }
};

// Update user by ID
exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    logger.info(`Updating user: ${userId}`, { data: req.body });
    const user = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      logger.warn(`User not found for update: ${userId}`);
      return res.status(404).send({ error: 'User not found' });
    }
    logger.info(`User updated successfully: ${userId}`);
    res.status(200).send(user);
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`, { 
      stack: error.stack,
      userId: req.params.id,
      data: req.body 
    });
    next(error);
  }
};

// Delete user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    logger.info(`Deleting user: ${userId}`);
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      logger.warn(`User not found for deletion: ${userId}`);
      return res.status(404).send({ error: 'User not found' });
    }
    logger.info(`User deleted successfully: ${userId}`);
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`, { 
      stack: error.stack,
      userId: req.params.id 
    });
    next(error);
  }
};