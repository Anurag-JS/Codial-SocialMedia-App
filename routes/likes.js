const express = require('express');
const router = express.Router();
const passport = require('passport');

const likesController = require('../controllers/likes_controller');
router.post('/toggle', passport.checkAuthentication, likesController.toggleLike);


// Exporting router so we can use it outside this file
module.exports= router;