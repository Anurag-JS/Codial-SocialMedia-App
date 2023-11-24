const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);

router.get('/sign-in', userController.signin);
router.get('/log-in', userController.login);

router.post('/create', userController.create);

// Using passport as middleware to authenticate
router.post('/create-session', passport.authenticate('local', {failureRedirect: '/users/log-in'}) ,userController.createSession);

router.get('/log-out', userController.destroySession);




// Exporting router so we can use it outside this file
module.exports= router;