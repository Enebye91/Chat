const express = require('express');
const router = express.Router();
const MongoUserRepository = require('../UserRepository/MongoUserRepo.js');
const DatabaseHandler = require('../DatabaseHandlers/DatabaseHandlerMongoDB.js');

// Initialiser database handler
const db = new DatabaseHandler();
const userRepository = new MongoUserRepository(db);

await db.connect();

// API Endpoints
router.get('/users/:id', async (req, res) => {
  try {
    const user = await userRepository.findUser({ _id: req.params.id });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/users', async (req, res) => {
  try {
    const userId = await userRepository.createUser(req.body);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateResult = await userRepository.updateUser({ _id: id }, req.body);
    if (updateResult.matchedCount > 0) {
      res.send('User updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const deleteResult = await userRepository.deleteUser({ _id: req.params.id });
    if (deleteResult.deletedCount > 0) {
      res.send('User deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
