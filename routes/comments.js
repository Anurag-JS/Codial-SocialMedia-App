const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comments_controller');
router.post('/create', passport.checkAuthentication, commentController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentController.destroy);





// Exporting router so we can use it outside this file
module.exports= router;