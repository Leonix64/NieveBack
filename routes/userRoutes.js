const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/users', UserController.create);

module.exports = router;