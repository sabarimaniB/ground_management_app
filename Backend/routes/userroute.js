const express = require('express');
const userController = require('../controllers/usercontroller');
const router = express.Router();
const auth = require("../middlewares/auth");

router.get('/users', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
