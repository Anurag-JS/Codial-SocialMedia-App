const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile', userController.profile);





// Exporting router so we can use it outside this file
module.exports= router;