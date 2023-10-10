const express = require('express');

const router = express.Router();

const postController = require('../controllers/posts_controller');
router.get('/', postController.post);





// Exporting router so we can use it outside this file
module.exports= router;