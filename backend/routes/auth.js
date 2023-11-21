const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// console.log("Just trying")
router.post('/', authController.handleLogin);
// console.log("In auth below")
module.exports = router;