const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile', userController.profile);
router.get('/sign-in', userController.signin);
router.get('/log-in', userController.login);

router.post('/create', userController.create);





// Exporting router so we can use it outside this file
module.exports= router;