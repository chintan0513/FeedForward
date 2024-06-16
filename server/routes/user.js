const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const checkUserExists = require("../middlewares/userAuth");

router.get('/', checkUserExists, userController.getUsers);
router.put('/:userId', checkUserExists, userController.updateUser);
router.post('/signup', userController.createUser);
router.post('/signin', userController.loginUser);

module.exports = router;