const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts_controller');
router.post('/create', passport.checkAuthentication, postController.create);





// Exporting router so we can use it outside this file
module.exports= router;